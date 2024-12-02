import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { randomUUID } from "crypto";

dotenv.config({
  path: "../../",
});

interface DBConfig {
  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
}

const config: DBConfig = {
  DATABASE_HOST: process.env.DB_HOST || "localhost",
  DATABASE_PORT: process.env.DB_PORT || "3306",
  DATABASE_USER: process.env.DB_USER || "root",
  DATABASE_PASSWORD: process.env.DB_PASS || "",
  DATABASE_NAME: process.env.DB_NAME || "roomy_database",
};

//configuracoa do sequelize
const Connection = new Sequelize(
  process.env.DB_NAME || "roomy_database",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "", // Senha vazia, se não houver senha configurada
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: true,
  }
);

export default Connection;
