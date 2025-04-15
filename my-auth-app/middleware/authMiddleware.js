const express = require( 'express' );
const jwt = require( 'jsonwebtoken' );

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = ( req, res, next ) =>
{
    const authHeader = req.headers[ 'authorization' ];
    const token = authHeader?.split( ' ' )[ 1 ];

    if ( !token ) return res.status( 401 ).json( { message: 'No token provided' } );
    try
    {
        const decoded = jwt.verify( token, SECRET_KEY );
        req.user = decoded;
        next();
    } catch ( err )
    {
        return res.status( 403 ).json( { message: 'Invalid token' } );
    }
};

module.exports = authMiddleware;