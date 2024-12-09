'use strict'

import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize, ForeignKey } from "sequelize";
import { Usuario } from "./usuario";
import { Imovel } from "./imovel";
import { Interesse } from "./interesse";

/**
 */
export class InteresseImovel extends Model{

    declare id: number;
    declare interesse_id: ForeignKey<Interesse['id']>;
    declare imovel_id: ForeignKey<Imovel['id']>;

    static associate(): void {
        console.log("associando interesse interesse_imovel")
        InteresseImovel.belongsTo(Imovel)
        InteresseImovel.belongsTo(Usuario)
    }
}

/**
 * Exporta a função que inicia o model de PatrocinadorEvento com suas especificações e validações
 * @param sequelize : Tipo Sequelize
 * @return void
 */
export function initInteresseImovel(sequelize: Sequelize): void {

    InteresseImovel.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

    }, {
        sequelize,
        modelName: 'UsuarioImovel',
        tableName: 'interesse_has_imoveis'
    })
}
