import { NextApiRequest, NextApiResponse } from 'next';
import tipoImovel from "../../../../db/controllers/tipoImovelController";
import db from '../../../../db/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log(id)

  try {
    await db.sequelize.authenticate();
    if (!id || typeof id !== 'string') throw new Error('ID inválido.');
    const userId = parseInt(id, 10);

    switch (req.method) {
      case 'GET':
        try {
          const tipo_imovel = await tipoImovel.show(userId)
          return res.status(200).json(tipo_imovel)

        } catch (error) {
          return res.status(400).json({ error: true, message: 'Não foi posssível processar a requisição!' })
        }
      case 'PUT':
        try {
          let data = req.body

          const update_tipo = await tipoImovel.update(userId, data)
          return res.status(200).json(update_tipo)

        } catch (error) {
          return res.status(400).json({ error: true, message: 'Não foi posssível processar a requisição!' })
        }
      case 'DELETE':
        try {
          const mensagem = await tipoImovel.delete(userId);
          res.status(200).json(mensagem);
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
