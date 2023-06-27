const { MongoClient } = require('mongodb');
const { seedDatabase } = require('./seedDatabase.js');
require('dotenv').config();

async function createEpisodeExercise(client) {
  const lastEpisodeOfSeason9 = {
    episode: 'S09E13',
    title: 'MOUNTAIN HIDE-AWAY',
    elements: [
      'CIRRUS',
      'CLOUDS',
      'CONIFER',
      'DECIDIOUS',
      'GRASS',
      'MOUNTAIN',
      'MOUNTAINS',
      'RIVER',
      'SNOWY_MOUNTAIN',
      'TREE',
      'TREES',
    ],
  };

  try {
    const result = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .insertOne(lastEpisodeOfSeason9);

    console.log(
      `Created season 9 episode 13 and the document got the id ${result.insertedId}`
    );
  } catch (error) {
    console.error(`Error creating episode:`, error);
  }
}

async function findEpisodesExercises(client) {
  try {
    const episode2Season2 = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .findOne({ episode: 'S02E02' });

    console.log(`The title of episode 2 in season 2: ${episode2Season2.title}`);

    const blackRiverEpisode = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .findOne({ title: 'BLACK RIVER' });

    console.log(
      `The season and episode number of the "BLACK RIVER" episode: ${blackRiverEpisode.episode}`
    );

    const cliffEpisodes = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .find({ elements: 'CLIFF' })
      .toArray();

    console.log(
      `The episodes that Bob Ross painted a CLIFF: ${cliffEpisodes.map(
        (ele) => ele.title
      )}`
    );

    const cliffLighthouseEpisodes = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .find({ elements: { $all: ['CLIFF', 'LIGHTHOUSE'] } })
      .toArray();

    console.log(
      `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE: ${cliffLighthouseEpisodes.map(
        (ele) => ele.title
      )}`
    );
  } catch (error) {
    console.error(`Error finding episodes:`, error);
  }
}

async function updateEpisodeExercises(client) {
  try {
    const updateResult = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .updateOne(
        { episode: 'S30E13' },
        { $set: { title: 'BLUE RIDGE FALLS' } }
      );

    console.log(
      `Updated episode 13 in season 30 and it updated ${updateResult.modifiedCount} episode(s).`
    );

    const updateBushesResult = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .updateMany({ elements: 'BUSHES' }, { $set: { 'elements.$': 'BUSH' } });

    console.log(
      `Updated all the BUSHES to BUSH and it updated ${updateBushesResult.modifiedCount} episode(s).`
    );
  } catch (error) {
    console.error(`Error updating episodes:`, error);
  }
}

async function deleteEpisodeExercise(client) {
  try {
    const deleteResult = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .deleteOne({ episode: 'S31E14' });

    console.log(
      `Deleted episode and it deleted ${deleteResult.deletedCount} episode(s).`
    );
  } catch (error) {
    console.error(`Error deleting episode:`, error);
  }
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }

  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    await seedDatabase(client);
    await createEpisodeExercise(client);
    await findEpisodesExercises(client);
    await updateEpisodeExercises(client);
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
