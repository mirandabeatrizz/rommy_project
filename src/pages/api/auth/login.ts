import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import usuarioDb from '../../../../db/controllers/usuarioController';
import db from '../../../../db/models';

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    await db.sequelize.authenticate();

    // Procura o usuário pelo email e senha
    const usuario = await usuarioDb.login(email, senha);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }


    // Gera o token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET_KEY, {
      expiresIn: '2h',
    });

    return res.status(200).json({ token });
  } catch (error: any) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
