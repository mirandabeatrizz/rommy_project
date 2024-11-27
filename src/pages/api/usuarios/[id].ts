import { NextApiRequest, NextApiResponse } from 'next';
import { getUsuarioById, updateUsuario, deleteUsuario } from '../../../../db/controllers/usuarioController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (!id || typeof id !== 'string') throw new Error('ID inválido.');
    const userId = parseInt(id, 10);

    if (req.method === 'GET') {
      const usuario = await getUsuarioById(userId);
      res.status(200).json(usuario);
    } else if (req.method === 'PUT') {
      const usuario = await updateUsuario(userId, req.body);
      res.status(200).json(usuario);
    } else if (req.method === 'DELETE') {
      const mensagem = await deleteUsuario(userId);
      res.status(200).json(mensagem);
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Método ${req.method} não permitido.` });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Erro interno do servidor.' });
  }
}
