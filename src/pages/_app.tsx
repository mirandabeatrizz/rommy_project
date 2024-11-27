import sequelize from '../../db/config/config';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida.');
    await sequelize.sync(); // Opcional: Sincronizar modelos com o banco
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
  }
})();

