import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';

export default async function verifyToken(req: NextApiRequest, res: NextApiResponse) {


    try {
        const token = req.cookies.token
        if (!token) {
            throw new Error("Token não encontrado!!")
        }

        const decode = jwt.verify(token, SECRET_KEY)
        return decode;


    } catch (error: any) {
        console.error('Erro no verifyToken:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}