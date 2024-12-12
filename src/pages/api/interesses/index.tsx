import { NextApiRequest, NextApiResponse } from "next";
import { Interesse } from "../../../../db/models/interesse";
import db from "../../../../db/models";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { valor, qtd_moradores, usuario_id, imovel_id } = req.body;

  try {
    await db.sequelize.authenticate(); // Autenticação com o banco de dados

    const interesse = await Interesse.create({
      data_criacao: new Date(),
      valor: valor,
      qtd_moradores: qtd_moradores,
      usuario_id: usuario_id,
      imovel_id: imovel_id,
    });

    return res.status(201).json(interesse);
  } catch (error) {
    console.error("Erro ao criar interesse:", error);
    return res.status(500).json({ error: "Erro ao criar interesse" });
  }
}
