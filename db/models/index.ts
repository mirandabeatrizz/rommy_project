import { Sequelize } from "sequelize";

import sequelize from "../config/config";

import { Usuario, initUsuario } from "./usuario";
import { Imovel, initImovel } from "./imovel";
import { Endereco, initEndereco } from "./endereco";

const db: any = {
  Usuario,
  Imovel,
  Endereco,
  sequelize,
  Sequelize,
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
})();

try {
  initUsuario(sequelize);
  initImovel(sequelize);
  initEndereco(sequelize);

  // (Object.keys(db) as (keyof typeof db)[]).forEach((modelName) => {
  //     if (modelName !== 'sequelize' && modelName !== 'Sequelize') {
  //         db[modelName].associate();
  //     }

  // });
} catch (error) {
  const newError = new Error(
    `Method: Sequelize initModels & associate \n ; file: models/index.ts:: ${error} `
  );

  console.log(newError.message, { critical: true, track: newError.stack });
}

export default db;

/*

*/
