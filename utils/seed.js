const connection = require('../config/connection');
const { Thought, User} = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await Thought.deleteMany({});

    await User.deleteMany({});

    const users = [];

    for (let i = 0; i < 20; i++) {
        const thoughtName = getRandomThoughts(20);
        const seedName = getRandomName();

        users.push({
            username,
            email,

        });
    }

    await User.collection.insertMany(users);

   console.table(users)
   console.info('Seeding complete!');
   process.exit(0);
});