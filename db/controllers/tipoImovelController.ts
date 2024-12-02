import Models from "../models/index";
import { TipoImovel as TipoImovelDb } from "../models/tipoImovel";
import { Imovel as ImovelDb } from "../models/imovel";

const tiposImovel = {
  async list() {
    try {
      console.log("Model TipoImovel:", TipoImovelDb === undefined ? "Não inicializado" : "Inicializado");

      const tipos = await TipoImovelDb.findAll()
        .then((response: TipoImovelDb[]) => {
          const data = response.map((record) => {
            return record.toJSON();
          });
          return data;
        })
        .then((response: any) => response);

      if (tipos) {
        return { list: tipos };
      }else{
        throw new Error('Não foi possivel listar o tipo imóvel.'); 
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: list; \n file: tipoImovelController.ts:: ${error}`
      );
     console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async show(id: number) {
    try {
      const tipo = await TipoImovelDb.findOne({
        where: { id: id },
      });
      if (!tipo) {
        throw new Error("Tipo Imóvel não encontrado.");
      }
      return tipo;
    } catch (error: any) {
      const newError = new Error(
        `Method: show; \n file: tipoImovelController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async create(data: TipoImovelDb) {
    try {
      if (data) {
        const tipo_imovel = await TipoImovelDb.create({
          nome: data.nome
        });
        return tipo_imovel;
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: create; \n file: tipoImovelController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, status: 500, message: newError.message };
    }
  },
  async update(tipo_id: number, data: TipoImovelDb) {
    try {
      if (tipo_id && data) {
        const tipo_imovel = await TipoImovelDb.findOne({
          where: {
            id: tipo_id,
          },
        });
        if (!tipo_imovel) {
          throw new Error("Tipo Imóvel não encontrado.");
        }
        return tipo_imovel.update(data);
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: update; \n file: tipoImovelController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async delete(id: number) {
    try {
      if (id) {
        const tipo = await TipoImovelDb.findByPk(id);
        if (!tipo) {
          throw new Error("Tipo imóvel não encontrado.");
        }
        await tipo.destroy();
        return { message: "Tipo imóvel deletado com sucesso." };
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: delete; \n file: tipoImovelController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },
};

export default tiposImovel;
