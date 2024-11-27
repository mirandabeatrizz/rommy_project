import { NextApiRequest, NextApiResponse } from 'next';
import { getUsuarios, createUsuario } from '../../../../db/controllers/usuarioController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const usuarios = await getUsuarios();
      res.status(200).json(usuarios);
    } else if (req.method === 'POST') {
      const usuario = await createUsuario(req.body);
      res.status(201).json(usuario);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Método ${req.method} não permitido.` });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Erro interno do servidor.' });
  }
}
