import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', '', '', {
  dialect: 'sqlite',
  storage: './pokemonDB.db', 
});

export default sequelize;