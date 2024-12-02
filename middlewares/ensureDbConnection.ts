import sequelize from "../db/config/config";

export const ensureDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw new Error("Não foi possível conectar ao banco de dados.");
  }
};
