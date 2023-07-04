const { setup } = require('./setup');
const { transfer } = require('./transfer');

const main = async () => {
  try {
    await setup();

    await transfer(101, 102, 1000, 'Transfer 1000');

    console.log('Transaction completed successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
