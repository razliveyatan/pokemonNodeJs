import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';

import { createPokemon } from './controllers/pokemonController';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'pokemonDB.db',
});

// Initialize Express
const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

// Define your routes
app.post('/pokemons', createPokemon);

// Start the application
(async () => {
  try {
    await sequelize.sync();
    console.log('Database connection established');


    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();