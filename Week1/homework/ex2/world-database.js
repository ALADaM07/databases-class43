const mysql = require('mysql');

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

const countriesWithPopulationGreaterThan8Million = `SELECT name
FROM country
WHERE population > 8000000;`;

connection.query(
  countriesWithPopulationGreaterThan8Million,
  (error, results) => {
    if (error) {
      console.error(
        `Error executing Countries With Population Greater Than 8 Million query: ${error}`
      );
      return;
    }
    const countriesName = results.map((result) => result.name);
    console.log(
      `Countries with population greater than 8 million are: 
    ${countriesName.join(', ')}`
    );
  }
);

const countriesWithNameContainingLand = `SELECT name
FROM country
WHERE name LIKE '%land%'`;

connection.query(countriesWithNameContainingLand, (error, results) => {
  if (error) {
    console.error`Error executing Countries Containing 'Land' In Their Name query: ${error}`;
    return;
  }
  const countriesName = results.map((result) => result.name);
  console.log(
    `Countries who have (land) in their names are: 
    ${countriesName.join(', ')}`
  );
});

const citiesWithPopulationInRange = `SELECT name
FROM city
WHERE population >= 500000 AND population <= 1000000`;

connection.query(citiesWithPopulationInRange, (error, results) => {
  if (error) {
    console.error`Error executing Cities With Population In Range query: ${error}`;
    return;
  }
  const countriesName = results.map((result) => result.name);
  console.log(
    `The names of the cities with population in between 500,000 and 1 million are: 
    ${countriesName.join(', ')}`
  );
});

const countriesInEurope = `SELECT name
FROM country
WHERE continent = 'Europe'`;

connection.query(countriesInEurope, (error, results) => {
  if (error) {
    console.error`Error executing Countries In Europe query: ${error}`;
    return;
  }
  const countriesName = results.map((result) => result.name);
  console.log(
    `The names of all the countries on the continent ‘Europe’ are: 
    ${countriesName.join(', ')}`
  );
});

const countriesInDescOrder = `SELECT name 
FROM country
ORDER BY surfaceArea DESC`;

connection.query(countriesInDescOrder, (error, results) => {
  if (error) {
    console.error`Error executing Countries In Desc Order query: ${error}`;
    return;
  }
  const countriesName = results.map((result) => result.name);
  console.log(
    `The names of all the countries in the descending order of their surface areas are: 
    ${countriesName.join(', ')}`
  );
});

const citiesInNLD = `SELECT name 
FROM city
WHERE CountryCode = 'NLD'`;

connection.query(citiesInNLD, (error, results) => {
  if (error) {
    console.error`Error executing Cities In NLD query: ${error}`;
    return;
  }
  const countriesName = results.map((result) => result.name);
  console.log(
    `The names of all the cities in the Netherlands are: 
    ${countriesName.join(', ')}`
  );
});

const rotterdamPopulation = `SELECT population 
FROM city
WHERE name = 'rotterdam'`;

connection.query(rotterdamPopulation, (error, results) => {
  if (error) {
    console.error`Error executing Rotterdam Population query: ${error}`;
    return;
  }
  const population = results[0].population;
  console.log(
    `The population of Rotterdam is: 
    ${population}`
  );
});

const topTenCountriesBySurfaceArea = `SELECT name 
FROM country
ORDER BY surfaceArea DESC
LIMIT 10`;

connection.query(topTenCountriesBySurfaceArea, (error, results) => {
  if (error) {
    console.error`Error executing Top Ten Countries By Surface Area query: ${error}`;
    return;
  }
  const countriesName = results.map((result) => result.name);
  console.log(
    `The top 10 countries by Surface Area are: 
    ${countriesName.join(', ')}`
  );
});

const topTenMostPopulatedCities = `SELECT name 
FROM city
ORDER BY Population DESC
LIMIT 10`;

connection.query(topTenMostPopulatedCities, (error, results) => {
  if (error) {
    console.error`Error executing Top Ten Most Populated Cities query: ${error}`;
    return;
  }
  const countriesName = results.map((result) => result.name);
  console.log(
    `The top 10 most populated cities are: 
    ${countriesName.join(', ')}`
  );
});

const thePopulationOfTheWorld = `SELECT SUM(population) AS  the_population_of_the_world
FROM country`;

connection.query(thePopulationOfTheWorld, (error, results) => {
  if (error) {
    console.error`Error executing The Population Of The World query: ${error}`;
    return;
  }
  const worldPopulation = results[0].the_population_of_the_world;
  console.log(
    `The Population Of The World is: 
    ${worldPopulation}`
  );
});

connection.end((error) => {
  if (error) {
    console.error('Error disconnecting from the server:', error);
    return;
  }
  console.log('Disconnected from the server!!');
});
