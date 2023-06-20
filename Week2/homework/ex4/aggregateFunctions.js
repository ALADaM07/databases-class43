require('dotenv').config();
const db = require('./db');
const config = require('./db-config');

const initializeDatabase = async () => {
  try {
    db.createConnection(config);

    await db.useDatabaseQuery('homework_2');

    await db
      .executeQuery(
        `SELECT
    a.author_name AS author,
    m.author_name AS mentor
  FROM
    authors a
  JOIN
    authors m ON a.mentor_id = m.author_id;`
      )
      .then((results) => {
        console.log(`Successfully Joined: 
        ${JSON.stringify(results)}`);
      })
      .catch((error) => {
        console.error(error);
      });

    await db
      .executeQuery(
        `SELECT
        a.*,
        p.paper_title
      FROM
        authors a
      LEFT JOIN
        research_papers p ON a.author_id = p.author_id;`
      )
      .then((results) => {
        console.log(`Successfully Left Joined: 
        ${JSON.stringify(results)}`);
      })
      .catch((error) => {
        console.error(error);
      });

    db.disconnect();
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

initializeDatabase();
