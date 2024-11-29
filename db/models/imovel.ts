import { Sequelize, DataTypes, Model } from "sequelize";
import { Endereco } from "./endereco"; // Importe o modelo Endereco

export class Imovel extends Model {
  declare idimovel: number;
  declare nome: string;
  declare descricao: string;
  declare tipo: number;
  declare tamanho: number;
  declare qtd_banheiros: number;
  declare qtd_quartos: number;
  declare vagas: number;
  declare mobilia: number;
  declare aluguel: number;
  declare condominio: number;
  declare status: boolean;
  declare endereco_id: number;

  static associate(): void {
    Imovel.belongsTo(Endereco, { foreignKey: "endereco_id" });
  }
}

export function initImovel(sequelize: Sequelize): void {
  Imovel.init(
    {
      idimovel: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.INTEGER,
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
      mobilia: {
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
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      endereco_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "endereco", // nome da tabela referenciada
          key: "id", // chave primária da tabela referenciada
        },
      },
    },
    {
      sequelize,
      modelName: "Imovel",
      tableName: "imovel",
      timestamps: false,
    }
  );
}
