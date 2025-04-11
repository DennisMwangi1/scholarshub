// Run once to set up the new tables
const sqlite3 = require( 'sqlite3' ).verbose();
const db = new sqlite3.Database( './auth.db' );
db.serialize( () =>
{
    db.run( `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      mfa_secret TEXT
    )
  `);

    db.run( `
    CREATE TABLE IF NOT EXISTS lecturers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      mfa_secret TEXT
    )
  `);
} );
