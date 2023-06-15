// const mysql = require('mysql');
// const tableInfo = require('./tables-info');
// // const faker = require('faker');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'hyfuser',
//   password: 'hyfpassword',
// });

// connection.connect((error) => {
//   if (error) {
//     console.error('Error connecting to the server:', error);
//     return;
//   }
//   console.log('Connected to the server :)');
// });

// const dropDatabaseQuery = 'DROP DATABASE IF EXISTS meetup';
// const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS meetup';
// const useDatabaseQuery = 'USE meetup';

// connection.query(dropDatabaseQuery, (error) => {
//   if (error) {
//     console.error(`Error dropping the meetup database: ${error}`);
//     return;
//   }
//   console.log(`Meetup database dropped successfully`);
// });
// connection.query(createDatabaseQuery, (error) => {
//   if (error) {
//     console.error(`Error creating the meetup database: ${error}`);
//     return;
//   }
//   console.log(`Meetup database created successfully`);
// });

// connection.query(useDatabaseQuery, (error) => {
//   if (error) {
//     console.error(`Error selecting the meetup database: ${error}`);
//     return;
//   }
// });

// const createTable = () => {
//   tableInfo.forEach((table) => {
//     const tableName = table.tableName;
//     const data = table.data[0];
//     const columnInfos = [];

//     Object.keys(data).forEach((key) => {
//       if (typeof data[key] === 'number') {
//         columnInfos.push(`${key} INT`);
//       } else if (typeof data[key] === 'string') {
//         columnInfos.push(`${key} VARCHAR(225)`);
//       }
//     });

//     const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnInfos.join(
//       ', '
//     )});`;

//     connection.query(createTableQuery, (error) => {
//       if (error) {
//         console.error(`Error creating ${tableName} table:`, error);
//       } else {
//         console.log(`${tableName} table created successfully!`);
//       }
//     });
//   });
// };

// createTable();

// const insertData = () => {
//   tableInfo.forEach((table) => {
//     const tableName = table.tableName;
//     const data = table.data;

//     data.forEach((row) => {
//       const query = `INSERT INTO \`${tableName}\` SET ?`;

//       connection.query(query, row, (error) => {
//         if (error) {
//           console.error(`Error inserting rows into ${tableName} table:`, error);
//           return;
//         }
//         console.log(`Row was inserted successfully into ${tableName} table!`);
//       });
//     });
//   });
// };

// insertData();

// connection.end((error) => {
//   if (error) {
//     console.error('Error disconnecting from the database:', error);
//     return;
//   }
//   console.log('Disconnected from the database');
// });
const mysql = require('mysql');
const tableInfo = require('./tables-info');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the server:', error);
    return;
  }
  console.log('Connected to the server :)');
});

const executeQuery = (query, values = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const dropDatabaseQuery = async () => {
  try {
    await executeQuery('DROP DATABASE IF EXISTS Meetup');
    console.log('Meetup database dropped successfully');
  } catch (error) {
    console.error(`Error dropping the meetup database: ${error}`);
  }
};

const createDatabaseQuery = async () => {
  try {
    await executeQuery('CREATE DATABASE Meetup');
    console.log('Meetup database created successfully');
  } catch (error) {
    console.error(`Error creating the meetup database: ${error}`);
  }
};

const useDatabaseQuery = async () => {
  try {
    await executeQuery('USE meetup');
  } catch (error) {
    console.error(`Error selecting the meetup database: ${error}`);
  }
};

const createTableQuery = async () => {
  try {
    for (const table of tableInfo) {
      const tableName = table.tableName;
      const data = table.data[0];

      const columnInfo = [];
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'number') {
          columnInfo.push(`${key} INT`);
        } else if (typeof data[key] === 'string') {
          columnInfo.push(`${key} VARCHAR(237)`);
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
  }
};
const insertDataToTable = async () => {
  try {
    tableInfo.forEach((table) => {
      const tableName = table.tableName;
      const data = table.data;

      data.forEach(async (row) => {
        const query = `INSERT INTO \`${tableName}\` SET ?`;

        try {
          await executeQuery(query, row);
          console.log(`Row was inserted successfully into ${tableName} table!`);
        } catch (error) {
          console.error(`Error inserting rows into ${tableName} table:`, error);
        }
      });
    });
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const initializeDatabase = async () => {
  try {
    await dropDatabaseQuery();
    await createDatabaseQuery();
    await useDatabaseQuery();
    await createTableQuery();
    await insertDataToTable();
    connection.end((error) => {
      if (error) {
        console.error('Error disconnecting from the database:', error);
      } else {
        console.log('Disconnected from the database');
      }
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

initializeDatabase();
