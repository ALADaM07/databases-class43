const mysql = require('mysql');
const queries = require('./queriesData');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the server:', error);
    return;
  }
  console.log('Connected to the server!!');
});

const executeQuery = () => {
  queries.forEach((query) => {
    const question = query.question;
    const statement = query.statement;
    connection.query(statement, question, (error, result) => {
      if (error) throw error;
      console.log(`--------------------------`);
      console.table(`${query.question}: 
      ${JSON.stringify(result)}`);
      console.log(`--------------------------`);
    });
  });
};

executeQuery();
connection.end((error) => {
  if (error) {
    console.error('Error disconnecting from the server:', error);
    return;
  }
  console.log('Disconnected from the server!!');
});
