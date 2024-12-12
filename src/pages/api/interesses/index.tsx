import { NextApiRequest, NextApiResponse } from 'next';
import interesseDb from "../../../../db/controllers/interesseController";
import sequelize from 'sequelize';
import db from '../../../../db/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await db.sequelize.authenticate();  // Testando a conexão
    console.log("Banco de dados conectado");
    switch (req.method) {
      case 'GET':
        try {
          const interesses = await interesseDb.list();
          res.status(200).json(interesses);
        } catch (error) {
          return res.status(400).json({ error: true, message: 'Não foi posssível processar a requisição!' })
        }
      case 'POST':
        try {
          let data = req.body;
          const new_user = await interesseDb.create(data);
          return res.status(200).json(new_user)

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
