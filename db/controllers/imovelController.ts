import Models from "../models/index";
import { Endereco as EnderecoDb } from "../models/endereco";
import { Imovel as ImovelDb } from "../models/imovel";
import { Usuario as UsuarioDb } from "../models/usuario";
import { UsuarioImovel as UsuarioImovelDb } from "../models/usuarioImovel";

const imoveis = {
  async list() {
    try {
      const imoveis = await ImovelDb.findAll({
        attributes: [
          "titulo",
          "endereco_id",
          "descricao",
          "qtd_quartos",
          "qtd_banheiros",
          "vagas",
          "ocupado",
          "aluguel",
          "condominio",
          "tamanho",
          "ocupacao_max",
        ],
      })
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
        where: { id: id },
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
        const {
          usuario_id,
          titulo,
          descricao,
          tamanho,
          qtd_banheiros,
          qtd_quartos,
          vagas,
          aluguel,
          condominio,
          ocupado,
          ocupacao_max,
          endereco_id,
        } = data;

        // busca as informações do usuário para criar o vinculo com o imóvel
        const usuario = await UsuarioDb.findOne({
          where: { id: usuario_id },
        });

        if (usuario) {
          // se encontrou o usuário então cria o imovel
          const imovel = await ImovelDb.create({
            titulo: titulo,
            descricao: descricao,
            tamanho: tamanho,
            qtd_banheiros: qtd_banheiros,
            qtd_quartos: qtd_quartos,
            vagas: vagas,
            aluguel: aluguel,
            condominio: condominio,
            ocupado: ocupado,
            ocupacao_max: ocupacao_max,
            endereco_id: endereco_id,
          }).then(async (imovel) => {
            // após criar as informações do imóvel associa ele com o usuário
            await UsuarioImovelDb.create({
              usuario_id: usuario.id,
              imovel_id: imovel.id,
              relacao_id: 1, //id da relação de proprietario
            });
          });

          return imovel;
        }
        throw new Error("Usuário não encontrado.");
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
            id: imovel_id,
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
