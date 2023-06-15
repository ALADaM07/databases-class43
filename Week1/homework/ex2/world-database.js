const mysql = require('mysql');
const queries = require('./queries');

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

queries.forEach((query) => {
  for (let i = 0; i <= 9; i++) {
    const queryKey = Object.keys(query)[i];
    const queryString = query[queryKey];

    connection.query(queryString, (error, results) => {
      if (error) {
        console.error(`Error executing query "${queryKey}": ${error}`);
        return;
      }
      if (queryKey === 'rotterdam_Population') {
        const population = results[0].population;
        console.log(`Results for query "${queryKey}":`);
        console.log(`${population}`);
        console.log('-----------------------------');
      } else if (queryKey === 'the_Population_Of_The_World') {
        const worldPopulation = results[0].the_population_of_the_world;
        console.log(`Results for query "${queryKey}":`);
        console.log(`${worldPopulation}`);
        console.log('-----------------------------');
      } else {
        const countriesName = results.map((result) => result.name);
        console.log(`Results for query "${queryKey}":`);
        console.log(countriesName.join(', '));
        console.log('-----------------------------');
      }
    });
  }
});

connection.end((error) => {
  if (error) {
    console.error('Error disconnecting from the server:', error);
    return;
  }
  console.log('Disconnected from the server!!');
});
