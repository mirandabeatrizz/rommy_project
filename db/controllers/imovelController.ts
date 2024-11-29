import Models from "../models/index";
import { Endereco as EnderecoDb } from "../models/endereco";
import { Imovel as ImovelDb } from "../models/imovel";

const imoveis = {
  async list() {
    try {
      const imoveis = await ImovelDb.findAll()
        .then((response: ImovelDb[]) => {
          const data = response.map((record) => {
            return record.toJSON();
          });
          return data;
        })
        .then((response: any) => response);

      if (imoveis) {
        return { list: imoveis };
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: list; \n file: imovelController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async show(id: number) {
    try {
      const imovel = await ImovelDb.findOne({
        where: { idimovel: id },
      });
      if (!imovel) {
        throw new Error("Imóvel não encontrado.");
      }
      return imovel;
    } catch (error: any) {
      const newError = new Error(
        `Method: show; \n file: imovelController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async create(data: ImovelDb) {
    try {
      if (data) {
        const imovel = await ImovelDb.create({
          nome: data.nome,
        });
        return imovel;
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: create; \n file: imovelController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, status: 500, message: newError.message };
    }
  },
  async update(imovel_id: number, data: ImovelDb) {
    try {
      if (imovel_id && data) {
        const imovel = await ImovelDb.findOne({
          where: {
            idimovel: imovel_id,
          },
        });
        if (!imovel) {
          throw new Error("Imóvel não encontrado.");
        }
        return imovel.update(data);
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: update; \n file: imovelController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async delete(id: number) {
    try {
      if (id) {
        const imovel = await ImovelDb.findByPk(id);
        if (!imovel) {
          throw new Error("Imóvel não encontrado.");
        }
        await imovel.destroy();
        return { message: "Imóvel deletado com sucesso." };
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: delete; \n file: imovelController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },
};

export default imoveis;
