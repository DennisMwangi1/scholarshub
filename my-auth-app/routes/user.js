const express = require( 'express' );
const authMiddleware = require( '../middleware/authMiddleware' );
const router = express.Router();
const db = require( '../db' );

const createAuthRoutes = () =>
{
    router.get( '/me', authMiddleware, ( req, res ) =>
    {
        const { id, role } = req.user;

        // Choose the table based on the role
        const table = role === 'lecturer' ? 'lecturers' : 'students';

        db.get( `SELECT * FROM ${ table } WHERE id = ?`, [ id ], ( err, user ) =>
        {
            if ( err ) return res.status( 500 ).json( { message: 'Database error' } );
            if ( !user ) return res.status( 404 ).json( { message: 'User not found' } );

            // Optional: exclude sensitive info like password and mfa_secret
            const { password, mfa_secret, ...safeUser } = user;

            res.json( { user: safeUser } );
        } );
    } );



};

createAuthRoutes();

module.exports = router;
