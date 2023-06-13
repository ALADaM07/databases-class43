const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connection to the database', err);
  }
  console.log('connected to database :)');
});

connection.query('SELECT 3 * 3 AS solution', function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(`The solution is: ${results[0].solution}`);
  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection: ', err);
      return;
    }
    console.log('Disconnected from the database.');
  });
});
