const { MongoClient } = require('mongodb');
const csv = require('csv-parser');
const fs = require('fs');

const main = async () => {
  const uri =
    'mongodb+srv://aladam:r1LB4exKBTU3sbYL@cluster0.2yhkkuu.mongodb.net/databaseWeek4?retryWrites=true&w=majority';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const dbName = 'databaseWeek4';
  const collectionName = 'population';

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas successfully.');

    const session = client.startSession();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const stream = fs.createReadStream('population_pyramid_1950-2022.csv');

    stream
      .pipe(csv())
      .on('data', (row) => {
        const document = {
          Country: row.Country,
          Year: parseInt(row.Year),
          Age: row.Age,
          M: parseInt(row.M),
          F: parseInt(row.F),
        };

        collection.insertOne(document, { session });
      })
      .on('end', async () => {
        console.log('Data import completed.');

        try {
          const totalPopulationByCountry = await getTotalPopulationByCountry(
            db,
            session
          );
          console.log('Total population by country:', totalPopulationByCountry);

          const continentInfo = await getContinentInfoByYearAndAge(
            db,
            session,
            2020,
            '100+'
          );
          console.log(
            'Continent information for 2020, Age: 100+:',
            continentInfo
          );
        } catch (error) {
          console.error('Error retrieving data:', error);
        } finally {
          session.endSession();
          client.close();
          console.log('Database connection closed.');
        }
      })
      .on('error', (error) => {
        console.error('Error occurred during data import:', error);
        session.endSession();
        client.close();
      });
  } catch (e) {
    console.error('Error connecting to MongoDB Atlas:', e);
  }
};

const getTotalPopulationByCountry = async (db, session) => {
  const collection = db.collection('population');
  const result = await collection
    .aggregate(
      [
        {
          $group: {
            _id: {
              Country: '$Country',
              Year: '$Year',
            },
            countPopulation: { $sum: { $add: ['$M', '$F'] } },
          },
        },
        {
          $project: {
            _id: '$_id.Year',
            countPopulation: 1,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ],
      { session }
    )
    .toArray();

  return result;
};

const getContinentInfoByYearAndAge = async (db, session, year, age) => {
  const collection = db.collection('population');
  const result = await collection
    .aggregate(
      [
        {
          $match: {
            Year: year,
            Age: age,
          },
        },
        {
          $group: {
            _id: '$Country',
            Country: { $first: '$Country' },
            Year: { $first: '$Year' },
            Age: { $first: '$Age' },
            M: { $sum: '$M' },
            F: { $sum: '$F' },
            TotalPopulation: { $sum: { $add: ['$M', '$F'] } },
          },
        },
      ],
      { session }
    )
    .toArray();

  return result;
};

main();
