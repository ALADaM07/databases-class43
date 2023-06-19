const mysql = require('mysql');
const tableInfo = require('./table-info');

let connection;

const createConnection = (config, error) => {
  const dbConfig = require('./db-config');
  connection = mysql.createConnection(dbConfig);
  if (error) {
    console.error(`Error connecting to the database!!`);
    return;
  }
  console.log(`Connected to the database`);
};

const executeQuery = (query, values = []) => {
  return new Promise((res, rej) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error(`error executing ${query}`);
        rej(error);
      } else {
        res(results);
      }
    });
  });
};

const useDatabaseQuery = async (database) => {
  try {
    await executeQuery(`USE ${database}`);
    console.log(`${database} database in use`);
  } catch (error) {
    console.error(`Error using the ${database} database: ${error}`);
  }
};

const createTableQuery = async () => {
  try {
    for (const table of tableInfo) {
      const tableName = table.tableName;
      const data = table.data[0];

      const columnInfo = Object.keys(data).map((key) => {
        if (key === 'paper_id') {
          return `${key} INT PRIMARY KEY AUTO_INCREMENT`;
        } else if (typeof data[key] === 'number') {
          return `${key} INT`;
        } else if (typeof data[key] === 'string') {
          return `${key} VARCHAR(237)`;
        } else if (key === 'gender') {
          return `${key} ENUM('male', 'female')`;
        } else if (data[key] instanceof Date) {
          return `${key} DATE`;
        } else if (key === 'author_id') {
          return `${key} INT, FOREIGN KEY (${key}) REFERENCES Authors (${key})`;
        }
      });

      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnInfo.join(
        ', '
      )});`;
      await executeQuery(createTableQuery);
      console.log(`${tableName} table created successfully!`);
    }
  } catch (error) {
    console.error(`Error creating tables: ${error}`);
    throw error;
  }
};

const insertDataToTableQuery = async () => {
  try {
    for (const table of tableInfo) {
      const tableName = table.tableName;
      const data = table.data;

      for (const row of data) {
        const query = `INSERT INTO \`${tableName}\` SET ?`;

        try {
          await executeQuery(query, row);
          console.log(`Row was inserted successfully into ${tableName} table!`);
        } catch (error) {
          console.error(`Error inserting rows into ${tableName} table:`, error);
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

const disconnect = () => {
  connection.end((error) => {
    if (error) {
      console.error(`Error disconnecting from the database!!`);
      return;
    }
    console.log(`Disconnected from the database`);
  });
};

module.exports = {
  createConnection,
  executeQuery,
  useDatabaseQuery,
  createTableQuery,
  insertDataToTableQuery,
  disconnect,
};
