'use strict'

import {
    Model, InferAttributes, InferCreationAttributes, DataTypes,
    Sequelize, HasManyGetAssociationsMixin,
    Association,
    NonAttribute,
} from "sequelize";
import { Imovel } from "./imovel";
import { Contrato } from "./contrato";
import { UsuarioImovel } from "./usuarioImovel";
import { ContratoUsuario } from "./contratoUsuario"

/**
 * Classe que representa o model de Config e suas associações
 */
export class Relacao extends Model {

    declare id: number;
    declare nome: string;

    static associate(): void {
        console.log("associando modelo relacao")
        Relacao.hasMany(UsuarioImovel, { as: 'relacoes' })
        Relacao.hasMany(ContratoUsuario, {as: 'contratos'});
    }
}

/**
 * Exporta a função que inicia o model de Config com suas especificações e validações
 * @param sequelize  : Tipo Sequelize
 * @return : void
 */
export function initRelacao(sequelize: Sequelize): void {

    Relacao.init({
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
        modelName: 'Relacao',
        tableName: 'relacao',
        timestamps: false,
    })
}

