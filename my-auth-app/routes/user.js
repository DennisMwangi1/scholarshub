const express = require( 'express' );
const authMiddleware = require( '../middleware/authMiddleware' );
const router = express.Router();

const createAuthRoutes = () =>
{
    router.get( '/me', authMiddleware, ( req, res ) =>
    {
        res.json( {
            user: req.user,
        } );
    } );


};

createAuthRoutes();

module.exports = router;
