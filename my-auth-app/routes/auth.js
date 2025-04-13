const express = require( 'express' );
const bcrypt = require( 'bcrypt' );
const speakeasy = require( 'speakeasy' );
const qrcode = require( 'qrcode' );
const jwt = require( 'jsonwebtoken' );
const db = require( '../db' );
const authMiddleware = require( '../middleware/authMiddleware' );
const router = express.Router();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;


const createAuthRoutes = ( role, tableName ) =>
{
    router.post( `/${ role }/register`, async ( req, res ) =>
    {
        const { fullname, email, password } = req.body;
        if ( !fullname || !email || !password )
            return res.status( 400 ).json( { message: 'Full name, email, and password are required' } );

        try
        {
            const hashedPassword = await bcrypt.hash( password, SALT_ROUNDS );
            const mfa = speakeasy.generateSecret( { name: `${ role } (${ email })` } );

            const stmt = db.prepare( `INSERT INTO ${ tableName } (fullname, email, password, mfa_secret, role) VALUES (?, ?, ?, ?, ?)` );
            stmt.run( fullname, email, hashedPassword, mfa.base32, role, async function ( err )
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
                return res.status( 201 ).json( {
                    message: `${ role } registered successfully`,
                    qr,
                    mfa_required: true
                } );
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
        if ( !email || !password )
            return res.status( 400 ).json( { message: 'Email and password required' } );

        db.get( `SELECT * FROM ${ tableName } WHERE email = ?`, [ email ], async ( err, user ) =>
        {
            if ( err ) return res.status( 500 ).json( { message: 'Database error' } );
            if ( !user ) return res.status( 401 ).json( { message: 'Invalid credentials' } );

            const passwordMatch = await bcrypt.compare( password, user.password );
            if ( !passwordMatch ) return res.status( 401 ).json( { message: 'Invalid credentials' } );

            if ( user.mfa_secret )
            {
                if ( !otp )
                {
                    return res.status( 206 ).json( {
                        message: 'OTP required to complete login',
                        mfa_required: true
                    } );
                }

                const isVerified = speakeasy.totp.verify( {
                    secret: user.mfa_secret,
                    encoding: 'base32',
                    token: otp,
                    window: 1
                } );

                if ( !isVerified ) return res.status( 401 ).json( { message: 'Invalid OTP' } );
            }

            const token = jwt.sign( { id: user.id, email: user.email, name: user.fullname, role: user.role }, JWT_SECRET, { expiresIn: '1h' } );

            return res.json( {
                message: 'Login successful',
                token
            } );
        } );
    } );

    router.get( '/me', authMiddleware, ( req, res ) =>
    {
        res.json( {
            user: req.user,
        } );
    } );


};

createAuthRoutes( 'student', 'students' );
createAuthRoutes( 'lecturer', 'lecturers' );

module.exports = router;
