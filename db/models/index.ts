import { Sequelize } from "sequelize";

import sequelize from "../config/config";

import { Usuario, initUsuario } from "./usuario";
import { Imovel, initImovel } from "./imovel";
import { Endereco, initEndereco } from "./endereco";
import { TipoImovel, initTipoImovel } from "./tipoImovel";
import { Relacao, initRelacao } from "./relacao";
import { Interesse, initInteresse } from "./interesse";
import { ContratoUsuario, initContratoUsuario } from "./contratoUsuario";
import { Contrato, initContrato} from "./contrato";
import { initInteresseImovel, InteresseImovel } from "./interesseImovel";

const db: any = {
  Usuario,
  Imovel,
  Endereco,
  TipoImovel,
  Relacao,
  Interesse,
  InteresseImovel,
  ContratoUsuario,
  Contrato,
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


async function initializeDatabase() {
  try {
    // Testar a conexão com o banco de dados
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados ativa.");

    // Inicializar os models
    initUsuario(sequelize);
    initImovel(sequelize);
    initTipoImovel(sequelize);
    initRelacao(sequelize);
    initInteresse(sequelize);
    initInteresseImovel(sequelize);
    initEndereco(sequelize);
    initContrato(sequelize);
    initContratoUsuario(sequelize);

    // Associar os models
   /* (Object.keys(db) as (keyof typeof db)[]).forEach((modelName) => {
      if (modelName !== 'sequelize' && modelName !== 'Sequelize') {
        db[modelName].associate();
      }
    });*/

    console.log("Modelos inicializados com sucesso.");

  } catch (error) {
    console.error("Erro ao conectar e inicializar os modelos:", error);
  }
}

// Chamando a função de inicialização do banco de dados
initializeDatabase();

// try {
//   console.log("Inicializando modelos...");
//   initUsuario(sequelize);
//   initImovel(sequelize);
//   initEndereco(sequelize);
//   initTipoImovel(sequelize);
//   initRelacao(sequelize);
//   initInteresse(sequelize);
  
//   console.log("Chamando associações...");
//   Object.keys(db).forEach((modelName) => {
//       if (modelName !== "sequelize" && modelName !== "Sequelize") {
//           db[modelName].associate?.();
//       }
//   });
  
// } catch (error) {
//   const newError = new Error(
//     `Method: Sequelize initModels & associate \n ; file: models/index.ts:: ${error} `
//   );

//   console.log(newError.message, { critical: true, track: newError.stack });
// }

export default db;
