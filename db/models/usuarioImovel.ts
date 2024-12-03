'use strict'

import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize, ForeignKey } from "sequelize";
import { Usuario } from "./usuario";
import { Imovel } from "./imovel";
import { Relacao } from "./relacao";

/**
 */
export class UsuarioImovel extends Model<InferAttributes<UsuarioImovel>, InferCreationAttributes<UsuarioImovel, { omit: 'id' }>> {

    declare id: number;
    declare usuario_id: ForeignKey<Usuario['id']>;
    declare imovel_id: ForeignKey<Imovel['id']>;
    declare relacao_id: ForeignKey<Relacao['id']>;

    static associate(): void {
        console.log("associando modelo usuario_imovel")
        UsuarioImovel.belongsTo(Imovel)
        UsuarioImovel.belongsTo(Usuario)
        UsuarioImovel.hasOne(Relacao)
    }
}

/**
 * Exporta a função que inicia o model de PatrocinadorEvento com suas especificações e validações
 * @param sequelize : Tipo Sequelize
 * @return void
 */
export function initUsuarioImovel(sequelize: Sequelize): void {

    UsuarioImovel.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

    }, {
        sequelize,
        modelName: 'UsuarioImovel',
        tableName: 'usuarios_has_imoveis'
    })
}
