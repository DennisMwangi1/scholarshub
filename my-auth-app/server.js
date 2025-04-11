// server.js
require( 'dotenv' ).config();
const express = require( 'express' );
const authRoutes = require( './routes/auth' );


const app = express();
const PORT = process.env.PORT || 3000;

app.use( express.json() ); // parse JSON bodies
app.use( '/auth', authRoutes ); // mount auth routes

app.get( '/', ( req, res ) => res.send( 'API is live 🚀' ) );

app.listen( PORT, () =>
{
    console.log( `Server is running on http://localhost:${ PORT }` );
} );
