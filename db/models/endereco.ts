import { Sequelize, DataTypes, Model } from "sequelize";
import { Imovel } from "./imovel";

export class Endereco extends Model {
  declare id: number;
  declare rua: string;
  declare bairro: string;
  declare cidade: string;
  declare estado: string;
  declare cep: string;

  static associate(): void {
    console.log("associando modelo endereco")
    Endereco.hasMany(Imovel);
}

}

export function initEndereco(sequelize: Sequelize): void {
  Endereco.init(
    {
      idendereco: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      rua: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bairro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Endereco",
      tableName: "endereco",
      timestamps: false,
    }
  );
}