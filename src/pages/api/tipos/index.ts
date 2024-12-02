import { NextApiRequest, NextApiResponse } from 'next';
import tipoImovel from "../../../../db/controllers/tipoImovelController";
import sequelize from 'sequelize';
import db from '../../../../db/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await db.sequelize.authenticate();  // Testando a conexão
    console.log("Banco de dados conectado");
    switch (req.method) {
      case 'GET':
        try {
          const tipos_imovel = await tipoImovel.list();
          res.status(200).json(tipos_imovel);
        } catch (error) {
          return res.status(400).json({ error: true, message: 'Não foi posssível processar a requisição!' })
        }
      case 'POST':
        try {
          let data = req.body;
          const new_tipo = await tipoImovel.create(data);
          return res.status(200).json(new_tipo)

        } catch (error) {
          return res.status(400).json({ error: true, message: 'Não foi posssível processar a requisição!' })
        }

      default:
        return res.status(405).json({ error: `Método ${req.method} não permitido.` });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Erro interno do servidor.' });
  }
}
