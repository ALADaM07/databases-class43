module.exports = [
  {
    question: `Countries With Population Greater Than 8 Million`,
    statement: `SELECT name
    FROM country
    WHERE population > 8000000;`,
  },
  {
    question: `Countries With Name Containing Land`,
    statement: `SELECT name
    FROM country
    WHERE name LIKE '%land%'`,
  },
  {
    question: `Cities With Population In Range`,
    statement: `SELECT name
    FROM city
    WHERE population BETWEEN 500000 AND 1000000`,
  },
  {
    question: `Countries In Europe`,
    statement: `SELECT name
    FROM country
    WHERE continent = 'Europe'`,
  },
  {
    question: `Countries In Desc Order`,
    statement: `SELECT name 
    FROM country
    ORDER BY surfaceArea DESC`,
  },
  {
    question: `Cities In NLD`,
    statement: `SELECT name 
    FROM city
    WHERE CountryCode = 'NLD'`,
  },
  {
    question: `Rotterdam Population`,
    statement: `SELECT population
    FROM city
    WHERE name = 'rotterdam'`,
  },
  {
    question: `Top Ten Countries By Surface Area`,
    statement: `SELECT name
    FROM country
    ORDER BY surfaceArea DESC
    LIMIT 10`,
  },
  {
    question: `Top Ten Most Populated Cities`,
    statement: `SELECT name
    FROM city
    ORDER BY Population DESC
    LIMIT 10`,
  },
  {
    question: `The Population Of The World:`,
    statement: `SELECT SUM(population) AS  ThePopulationOfTheWorld
    FROM country`,
  },
];
