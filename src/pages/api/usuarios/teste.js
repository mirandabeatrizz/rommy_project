// pages/api/teste.js
import db from '../../utils/db';

export default async function handler(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM usuario');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
  }
}
