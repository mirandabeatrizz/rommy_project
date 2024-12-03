import { NextApiRequest, NextApiResponse } from 'next';
import relacao from "../../../../db/controllers/relacaoController";
import sequelize from 'sequelize';
import db from '../../../../db/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await db.sequelize.authenticate();  // Testando a conexão
    console.log("Banco de dados conectado");
    switch (req.method) {
      case 'GET':
        try {
          const relacoes = await relacao.list();
          res.status(200).json(relacoes);
        } catch (error) {
          return res.status(400).json({ error: true, message: 'Não foi posssível processar a requisição!' })
        }
      case 'POST':
        try {
          let data = req.body;
          const nova_relacao = await relacao.create(data);
          return res.status(200).json(nova_relacao)

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
