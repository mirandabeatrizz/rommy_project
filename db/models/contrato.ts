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
export class Contrato extends Model {

    declare id: number;
    declare data_inicio: string;
    declare data_fim: string;
    declare valor: number;
    declare ativo: boolean;
    declare observacao: string;


    static associate(): void {}

}

/**
 * Exporta a função que inicia o model de Config com suas especificações e validações
 * @param sequelize  : Tipo Sequelize
 * @return : void
 */
export function initContrato(sequelize: Sequelize): void {

    Contrato.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        data_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data_fim: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        valor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        sequelize,
        modelName: 'Contrato',
        tableName: 'contratos',
        timestamps: false,
    })
}

