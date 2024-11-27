'use strict'

import {
    Model, InferAttributes, InferCreationAttributes, DataTypes,
    Sequelize, HasManyGetAssociationsMixin,
    Association,
    NonAttribute,
} from "sequelize";

/**
 * Classe que representa o model de Config e suas associações
 */
export class Usuario extends Model{

    declare idusuario: number;
    declare nome: string;
    declare email: string
    declare cpf: string;
    declare genero: number;
    declare data_nasc: Date;
    declare telefone: string;
    declare tipo: number;

    static associate(): void { }

}

/**
 * Exporta a função que inicia o model de Config com suas especificações e validações
 * @param sequelize  : Tipo Sequelize
 * @return : void
 */
export function initUsuario(sequelize: Sequelize): void {

    Usuario.init({
        idusuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            defaultValue: true,
        },
        cpf: {
            type: DataTypes.STRING(13),
            allowNull: false,
            defaultValue: true,
        },
        genero: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: true,
        },
        data_nasc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        telefone: {
            type: DataTypes.STRING(13),
            allowNull: false,
            defaultValue: true,
        },
        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false
        }

    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuario',
    })
}

