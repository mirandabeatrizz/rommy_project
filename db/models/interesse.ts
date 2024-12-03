'use strict'

import {
    Model, DataTypes,
    Sequelize,
    ForeignKey,
} from "sequelize";
import { Imovel } from "./imovel";
import { Usuario } from "./usuario";

/**
 */
export class Interesse extends Model {

    declare id: number;
    declare data_cricao: Date;
    declare valor: number;
    declare qtd_moradores: number;
    declare usuario_id: ForeignKey<Usuario['id']>;

    static associate(): void {

        console.log("associando modelo interesse")
        Interesse.hasMany(Imovel);
        Interesse.hasOne(Usuario);
    }
}

/**
 * Exporta a função que inicia o model de Config com suas especificações e validações
 * @param sequelize  : Tipo Sequelize
 * @return : void
 */
export function initInteresse(sequelize: Sequelize): void {

    Interesse.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        data_cricao: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        qtd_moradores: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        sequelize,
        modelName: 'Interesse',
        tableName: 'interesses',
        timestamps: false,
    })
}

