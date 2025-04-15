const sqlite3 = require( 'sqlite3' ).verbose();
const path = require( 'path' );
const db = new sqlite3.Database( path.join( __dirname, './auth.db' ) );

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
      department TEXT,      -- Optional: department
      studentId TEXT,       -- Optional: studentId
      courses TEXT          -- Optional: courses, can be stored as a JSON string
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
      department TEXT,      -- Optional: department
      employeeId TEXT,      -- Optional: employeeId
      courses TEXT          -- Optional: courses, can be stored as a JSON string
    )
  `);

  const insertStudentStmt = db.prepare( `
    INSERT INTO students (fullname, email, password, mfa_secret, role, department, studentId, courses)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertStudentStmt.run( "Shirlene", "shirlene@kca.com", "password123", null, "student", "Computer Science", "ST123456", JSON.stringify( [ "CS101", "MATH201", "ENG105", "PHYS101" ] ) );

  // Insert records for lecturers (including optional columns)
  const insertLecturerStmt = db.prepare( `
    INSERT INTO lecturers (fullname, email, password, mfa_secret, role, department, employeeId, courses)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertLecturerStmt.run( "Dr. Mwangi", "mwangi@kca.com", "password456", null, "lecturer", "Computer Science", "LC789012", JSON.stringify( [ "CS101", "CS202", "CS303" ] ) );

  insertStudentStmt.finalize();
  insertLecturerStmt.finalize();
} );

db.close( ( err ) =>
{
  if ( err )
  {
    console.error( 'Error closing the database', err );
  } else
  {
    console.log( 'Database connection closed' );
  }
} );
