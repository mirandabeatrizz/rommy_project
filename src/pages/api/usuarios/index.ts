import { NextApiRequest, NextApiResponse } from 'next';
import usuarioDb from "../../../../db/controllers/usuarioController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        try {
          const usuarios = await usuarioDb.list();
          res.status(200).json(usuarios);
        } catch (error) {
          return res.status(400).json({ error: true, message: 'Não foi posssível processar a requisição!' })
        }
      case 'POST':
        try {
          let data = req.body;
          const new_user = await usuarioDb.create(data);
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
