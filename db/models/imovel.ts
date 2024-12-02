import { Sequelize, DataTypes, Model } from "sequelize";
import { Endereco } from "./endereco"; 
import { TipoImovel } from "./tipoImovel";

export class Imovel extends Model {
  declare id: number;
  declare titulo: string;
  declare descricao: string;
  declare tamanho: number;
  declare qtd_banheiros: number;
  declare qtd_quartos: number;
  declare vagas: number;
  declare aluguel: number;
  declare condominio: number;
  declare ocupado: boolean;
  declare ocupacao_max: number;
  declare endereco_id: number;

  static associate(): void {
    Imovel.belongsTo(Endereco, { foreignKey: "endereco_id" });
    Imovel.belongsTo(TipoImovel, {foreignKey: "tipoimovel_id"});
  }
}

export function initImovel(sequelize: Sequelize): void {
  Imovel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tamanho: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      qtd_banheiros: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qtd_quartos: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vagas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      aluguel: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      condominio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      ocupado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      ocupacao_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Imovel",
      tableName: "imoveis",
      timestamps: false,
    }
  );
}
