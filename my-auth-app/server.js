// server.js
require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const authRoutes = require( './routes/auth' );
const userRoutes = require( './routes/user' );
const { corsConfig } = require( './cors/cors' );
const db = require( './db' );

const app = express();
const PORT = process.env.PORT || 3000;
app.use( express.json() );
app.use( cors( corsConfig ) );
app.use( '/auth', authRoutes );
app.use( '/user', userRoutes );

app.get( '/', ( req, res ) => res.send( 'API is live 🚀' ) );

app.listen( PORT, () =>
{
    console.log( `Server is running on http://localhost:${ PORT }` );
} );
