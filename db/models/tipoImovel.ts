'use strict'

import {
    Model, InferAttributes, InferCreationAttributes, DataTypes,
    Sequelize, HasManyGetAssociationsMixin,
    Association,
    NonAttribute,
} from "sequelize";
import { Imovel } from "./imovel";

/**
 * Classe que representa o model de Config e suas associações
 */
export class TipoImovel extends Model {

    declare id: number;
    declare nome: string;


    static associate(): void {
        console.log("associando modelo tipo_imovel")
        TipoImovel.hasMany(Imovel);
    }

}

/**
 * Exporta a função que inicia o model de Config com suas especificações e validações
 * @param sequelize  : Tipo Sequelize
 * @return : void
 */
export function initTipoImovel(sequelize: Sequelize): void {

    TipoImovel.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'TipoImovel',
        tableName: 'tipoImovel',
        timestamps: false,
    })
}

