const express = require( 'express' );
const bcrypt = require( 'bcrypt' );
const speakeasy = require( 'speakeasy' );
const qrcode = require( 'qrcode' );
const jwt = require( 'jsonwebtoken' );
const db = require( '../db' );  // Adjust the path based on where your database setup is
const router = express.Router();

const SALT_ROUNDS = 10;
const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual JWT secret


const createAuthRoutes = ( role, tableName ) =>
{
    // Register
    router.post( `/${ role }/register`, async ( req, res ) =>
    {
        const { fullname, email, password } = req.body;
        if ( !fullname || !email || !password )
            return res.status( 400 ).json( { message: 'Full name, email, and password are required' } );

        try
        {
            const hashedPassword = await bcrypt.hash( password, SALT_ROUNDS );
            const mfa = speakeasy.generateSecret( { name: `${ role } (${ email })` } );

            const stmt = db.prepare( `INSERT INTO ${ tableName } (fullname, email, password, mfa_secret) VALUES (?, ?, ?, ?)` );
            stmt.run( fullname, email, hashedPassword, mfa.base32, async function ( err )
            {
                if ( err )
                {
                    if ( err.message.includes( 'UNIQUE constraint failed' ) )
                    {
                        return res.status( 409 ).json( { message: 'Email already exists' } );
                    }
                    return res.status( 500 ).json( { message: 'Database error' } );
                }

                const qr = await qrcode.toDataURL( mfa.otpauth_url );
                return res.status( 201 ).json( { message: `${ role } registered successfully`, qr } );
            } );
        } catch ( err )
        {
            return res.status( 500 ).json( { message: 'Server error' } );
        }
    } );

    // Login
    router.post( `/${ role }/login`, async ( req, res ) =>
    {
        const { email, password, otp } = req.body;
        if ( !email || !password ) return res.status( 400 ).json( { message: 'Email and password required' } );

        db.get( `SELECT * FROM ${ tableName } WHERE email = ?`, [ email ], async ( err, user ) =>
        {
            if ( err ) return res.status( 500 ).json( { message: 'Database error' } );
            if ( !user ) return res.status( 401 ).json( { message: 'Invalid credentials' } );

            const passwordMatch = await bcrypt.compare( password, user.password );
            if ( !passwordMatch ) return res.status( 401 ).json( { message: 'Invalid credentials' } );

            // Check if MFA is enabled
            if ( user.mfa_secret )
            {
                // If OTP is not provided, return a response indicating MFA is required
                if ( !otp )
                {
                    return res.status( 206 ).json( {
                        message: 'OTP required',
                        mfa: true
                    } );
                }

                // Verify OTP
                const isVerified = speakeasy.totp.verify( {
                    secret: user.mfa_secret,
                    encoding: 'base32',
                    token: otp
                } );

                if ( !isVerified ) return res.status( 401 ).json( { message: 'Invalid OTP' } );
            }

            // Generate JWT token after successful password (and OTP if necessary) verification
            const token = jwt.sign( { id: user.id, email: user.email, role }, JWT_SECRET, { expiresIn: '1h' } );

            // Send a successful login response with the token and a success message
            return res.json( {
                message: 'Login successful',
                token
            } );
        } );
    } );

};

// Register student and lecturer routes
createAuthRoutes( 'student', 'students' );
createAuthRoutes( 'lecturer', 'lecturers' );

module.exports = router;
