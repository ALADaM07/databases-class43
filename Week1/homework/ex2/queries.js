module.exports = [
  {
    countries_With_Population_Greater_Than_8Million: `SELECT name
        FROM country
        WHERE population > 8000000;`,

    countries_With_Name_Containing_Land: `SELECT name
        FROM country
        WHERE name LIKE '%land%'`,
    cities_With_Population_In_Range: `SELECT name
        FROM city
        WHERE population BETWEEN 500000 AND 1000000`,
    countries_In_Europe: `SELECT name
        FROM country
        WHERE continent = 'Europe'`,

    countries_In_Desc_Order: `SELECT name 
        FROM country
        ORDER BY surfaceArea DESC`,
    cities_In_NLD: `SELECT name 
        FROM city
        WHERE CountryCode = 'NLD'`,
    rotterdam_Population: `SELECT population
        FROM city
        WHERE name = 'rotterdam'`,
    top_Ten_Countries_By_Surface_Area: `SELECT name
        FROM country
        ORDER BY surfaceArea DESC
        LIMIT 10`,

    top_Ten_Most_Populated_Cities: `SELECT name
        FROM city
        ORDER BY Population DESC
        LIMIT 10`,
    the_Population_Of_The_World: `SELECT SUM(population) AS  the_population_of_the_world
        FROM country`,
  },
];
