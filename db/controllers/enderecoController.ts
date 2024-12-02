import Models from "../models/index";
import { Endereco as EnderecoDb } from "../models/endereco";
import { Imovel as ImovelDb } from "../models/imovel";

const enderecos = {
  async list() {
    try {
      console.log("Model Endereco:", EnderecoDb === undefined ? "Não inicializado" : "Inicializado");

      const enderecos = await EnderecoDb.findAll()
        .then((response: EnderecoDb[]) => {
          const data = response.map((record) => {
            return record.toJSON();
          });
          return data;
        })
        .then((response: any) => response);

      if (enderecos) {
        return { list: enderecos };
      }else{
        throw new Error('Não foi possivel listar o endereco.'); 
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: list; \n file: enderecoController.ts:: ${error}`
      );
     console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async show(id: number) {
    try {
      const endereco = await EnderecoDb.findOne({
        where: { id: id },
      });
      if (!endereco) {
        throw new Error("Endereço não encontrado.");
      }
      return endereco;
    } catch (error: any) {
      const newError = new Error(
        `Method: show; \n file: enderecoController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async create(data: EnderecoDb) {
    try {
      if (data) {
        console.log(data);
        const endereco = await EnderecoDb.create({
          rua: data.rua,
          cidade: data.cidade,
          bairro: data.bairro,
          estado: data.estado,
          cep: data.cep,
        });
        return endereco;
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: create; \n file: enderecoController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, status: 500, message: newError.message };
    }
  },
  async update(endereco_id: number, data: EnderecoDb) {
    try {
      if (endereco_id && data) {
        const endereco = await EnderecoDb.findOne({
          where: {
            id: endereco_id,
          },
        });
        if (!endereco) {
          throw new Error("Endereco não encontrado.");
        }
        return endereco.update(data);
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: update; \n file: enderecoController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },

  async delete(id: number) {
    try {
      if (id) {
        const endereco = await EnderecoDb.findByPk(id);
        if (!endereco) {
          throw new Error("Endereço não encontrado.");
        }
        await endereco.destroy();
        return { message: "Endereço deletado com sucesso." };
      }
    } catch (error: any) {
      const newError = new Error(
        `Method: delete; \n file: enderecoController.ts:: ${error}`
      );
      console.log(newError.message, { critical: false, track: newError.stack });
      return { error: true, message: newError.message };
    }
  },
};

export default enderecos;
