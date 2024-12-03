'use strict'

import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize, ForeignKey } from "sequelize";
import { Usuario } from "./usuario";
import { Relacao } from "./relacao";
import { Contrato } from "./contrato";

/**
 */
export class ContratoUsuario extends Model<InferAttributes<ContratoUsuario>, InferCreationAttributes<ContratoUsuario, { omit: 'id' }>> {

    declare id: number;
    declare usuario_id: ForeignKey<Usuario['id']>;
    declare contrato_id: ForeignKey<Contrato['id']>;
    declare relacao_id: ForeignKey<Relacao['id']>;

    static associate(): void {
        console.log("associando modelo ContratoUsuario")
        ContratoUsuario.belongsTo(Contrato,{ foreignKey: 'usuario_id'})
        ContratoUsuario.belongsTo(Usuario)
        ContratoUsuario.hasOne(Relacao)
    }
}

/**
 * Exporta a função que inicia o model de PatrocinadorEvento com suas especificações e validações
 * @param sequelize : Tipo Sequelize
 * @return void
 */
export function initContratoUsuario(sequelize: Sequelize): void {

    ContratoUsuario.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

    }, {
        sequelize,
        modelName: 'ContratoUsuario',
        tableName: 'usuarios_has_contratos'
    })
}
