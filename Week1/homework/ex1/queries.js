const mysql = require('mysql');
const faker = require('faker');

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

const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS meetup';
const useDatabaseQuery = 'USE meetup';
const createInviteTable = `CREATE TABLE IF NOT EXISTS Invite (
    invite_no INT,
    invite_name VARCHAR(100),
    invited_by VARCHAR(100)
    );`;
const createRoomTable = `CREATE TABLE IF NOT EXISTS Room (
    room_no INT,
    room_name VARCHAR(100),
    floor_number INT
    );`;
const createMeetingTable = `CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT,
    meeting_title VARCHAR(237),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT
    );`;

connection.query(createDatabaseQuery, (error) => {
  if (error) {
    console.error(`Error creating the meetup database: ${error}`);
    return;
  }
  console.log(`Meetup database created successfully`);
});

connection.query(useDatabaseQuery, (error) => {
  if (error) {
    console.error(`Error selecting the meetup database: ${error}`);
    return;
  }
});

connection.query(createInviteTable, (error) => {
  if (error) {
    console.error(`Couldn't create Invite table: ${error}`);
    return;
  }
  console.log(`Invite table created successfully!`);
});

connection.query(createRoomTable, (error) => {
  if (error) {
    console.error(`Couldn't create Room table: ${error}`);
    return;
  }
  console.log(`Room table created successfully!`);
});

connection.query(createMeetingTable, (error) => {
  if (error) {
    console.error(`Couldn't create Meeting table: ${error}`);
    return;
  }
  console.log(`Meeting table created successfully!`);
});

const randomNameGenerator = (index) => faker.name.findName();

for (let i = 1; i <= 5; i++) {
  const inviteData = {
    invite_no: i,
    invite_name: randomNameGenerator(i),
    invited_by: randomNameGenerator(i),
  };
  connection.query('INSERT INTO Invite SET ?', inviteData, (error) => {
    if (error) {
      console.error('Error inserting rows into Invite Table');
      return;
    }
    if (i === 5) {
      console.log('Rows were inserted successfully into Invite table!');
    }
  });
}

for (let i = 1; i <= 5; i++) {
  const roomData = {
    room_no: i,
    room_name: `Room ${Math.floor(Math.random() * 10) + 1}`,
    floor_number: Math.floor(Math.random() * 7) + 1,
  };
  connection.query('INSERT INTO Room SET ?', roomData, (error) => {
    if (error) {
      console.error('Error inserting rows into Room Table');
      return;
    }
    if (i === 5) {
      console.log('Rows were inserted successfully into Room table!');
    }
  });
}

for (let i = 1; i <= 5; i++) {
  const meetingData = {
    meeting_no: i,
    meeting_title: `Meeting ${i}`,
    starting_time: new Date(),
    ending_time: new Date(),
    room_no: i,
  };
  connection.query('INSERT INTO Meeting SET ?', meetingData, (error) => {
    if (error) {
      console.error('Error inserting rows into Meeting Table');
      return;
    }
    if (i === 5) {
      console.log('Rows were inserted successfully into Meeting table!');
    }
  });
}

connection.end((error) => {
  if (error) {
    console.error('Error disconnecting from the database:', error);
    return;
  }
  console.log('Disconnected from the database');
});
