import { Sequelize } from 'sequelize-typescript';

// Configure o Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false, // Defina como true para depurar queries no console
  models: [__dirname + '/../models'], // Diretório dos modelos
});

export default sequelize;
