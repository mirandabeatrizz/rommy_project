import { Relacao as RelacaoDb } from "../models/relacao";

const relacao = {
  async list() {
    try {
      console.log("Model TipoImovel:", RelacaoDb === undefined ? "Não inicializado" : "Inicializado");

      const relacoes = await RelacaoDb.findAll()
        .then((response: RelacaoDb[]) => {
          const data = response.map((record) => {
            return record.toJSON();
          });
          return data;
        })
        .then((response: any) => response);

      if (relacoes) {
        return { list: relacoes };
      }else{
        throw new Error('Não foi possivel listar as relações.'); 
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: list; \n file: relacaoController.ts:: ${error}`
      );
     console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async show(id: number) {
    try {
      const relacao = await RelacaoDb.findOne({
        where: { id: id },
      });
      if (!relacao) {
        throw new Error("relação não encontrado.");
      }
      return relacao;
    } catch (error: any) {
      const newError = new Error(
        `Method: show; \n file: relacaoController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async create(data: RelacaoDb) {
    try {
      if (data) {
        const relacao = await RelacaoDb.create({
          nome: data.nome
        });
        return relacao;
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: create; \n file: relacaoController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, status: 500, message: newError.message };
    }
  },
  async update(relacao_id: number, data: RelacaoDb) {
    try {
      if (relacao_id && data) {
        const relacao = await RelacaoDb.findOne({
          where: {
            id: relacao_id,
          },
        });
        if (!relacao) {
          throw new Error("relação não encontrado.");
        }
        return relacao.update(data);
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: update; \n file: relacaoController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async delete(id: number) {
    try {
      if (id) {
        const relacao = await RelacaoDb.findByPk(id);
        if (!relacao) {
          throw new Error("relação não encontrado.");
        }
        await relacao.destroy();
        return { message: "relação deletado com sucesso." };
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: delete; \n file: relacaoController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },
};

export default relacao;
