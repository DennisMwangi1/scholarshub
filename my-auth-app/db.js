const sqlite3 = require( 'sqlite3' ).verbose();
const path = require( 'path' );
const bcrypt = require( 'bcrypt' );
const speakeasy = require( 'speakeasy' );

const db = new sqlite3.Database( path.join( __dirname, './auth.db' ) );
const saltRounds = 10;
const plainPassword = "12345678"; // Your plain password

bcrypt.hash( plainPassword, saltRounds, ( err, hashedPassword ) =>
{
  if ( err )
  {
    return console.error( 'Error hashing password:', err );
  }

  db.serialize( () =>
  {
    db.run( `
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        mfa_secret TEXT,
        role TEXT,
        department TEXT,
        studentId TEXT,
        courses TEXT
      )
    `);

    db.run( `
      CREATE TABLE IF NOT EXISTS lecturers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        mfa_secret TEXT,
        role TEXT,
        department TEXT,
        employeeId TEXT,
        courses TEXT
      )
    `);

    // Generate MFA secrets
    const studentEmail = "shirlene@kca.com";
    const studentRole = "student";
    const studentMfa = speakeasy.generateSecret( { name: `${ studentRole } (${ studentEmail })` } );

    const lecturerEmail = "mwangi@kca.com";
    const lecturerRole = "lecturer";
    const lecturerMfa = speakeasy.generateSecret( { name: `${ lecturerRole } (${ lecturerEmail })` } );

    // Insert student
    const insertStudentStmt = db.prepare( `
      INSERT INTO students (fullname, email, password, mfa_secret, role, department, studentId, courses)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStudentStmt.run(
      "Shirlene",
      studentEmail,
      hashedPassword,
      studentMfa.base32,
      studentRole,
      "Computer Science",
      "ST123456",
      JSON.stringify( [ "CS101", "MATH201", "ENG105", "PHYS101" ] )
    );

    // Insert lecturer
    const insertLecturerStmt = db.prepare( `
      INSERT INTO lecturers (fullname, email, password, mfa_secret, role, department, employeeId, courses)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertLecturerStmt.run(
      "Dr. Mwangi",
      lecturerEmail,
      hashedPassword,
      lecturerMfa.base32,
      lecturerRole,
      "Computer Science",
      "LC789012",
      JSON.stringify( [ "CS101", "CS202", "CS303" ] )
    );

    insertStudentStmt.finalize();
    insertLecturerStmt.finalize();
  } );
} );

module.exports = db;
