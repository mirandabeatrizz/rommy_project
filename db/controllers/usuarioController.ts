
import Models from "../models/index";
import { Usuario as UsuarioDb } from "../models/usuario";
import Criptografia, { hashMe } from '../../utils/cipherText'

const pass_transport = Buffer.from(process.env.PASS_TRANSPORT ?? '0', 'hex')
const pass_iv = Buffer.from(process.env.PASS_IV ?? '0', 'hex')
const cipher = new Criptografia(pass_transport, pass_iv, 'aes-256-gcm');


const usuarios = {

    async list() {
        try {
            const usuarios = await UsuarioDb.findAll({
                attributes: ['nome', 'email', 'cpf', 'genero', 'data_nasc', 'celular', 'senha']
            }).then((response: UsuarioDb[]) => {
                const data = response.map((record) => {
                    return record.toJSON()
                })
                return data
            }).then((response: any) => response)

            if (usuarios) {
                return { list: usuarios }
            }
        } catch (error: any) {
            const newError = new Error(`Method: list; \n file: usuarioController.ts:: ${error}`);
            console.log(newError.message, { critical: false, track: newError.stack })
            return { error: true, status: 500, message: newError.message }
        }
    },

    async findByEmail(email: string) {
        try {
            const usuario = await UsuarioDb.findOne({ where: { email } });
            return usuario ? usuario.toJSON() : null;
        } catch (error) {
            console.error('Erro ao buscar usuário por email:', error);
            throw error;
        }
    },

    async login(email: string, senha: string) {
        try {
            //cria o hash da senha submetida
            const hashPassword = hashMe(cipher.criptografa(senha));

            const usuario = await UsuarioDb.findOne({
                where: {
                    email: email,
                    senha: hashPassword
                }
            });
            return usuario ? usuario : null;
        } catch (error) {
            console.error('Erro ao buscar usuário por email:', error);
            throw error;
        }
    },

    async show(id: number) {
        try {

            const usuario = await UsuarioDb.findOne({
                where: { id: id }
            })
            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }
            return usuario;

        } catch (error: any) {
            const newError = new Error(`Method: show; \n file: usuarioController.ts:: ${error}`);
            console.log(newError.message, { critical: false, track: newError.stack })
            return { error: true, status: 500, message: newError.message }
        }
    },

    async showByEmail(email: string) {
        try {
            const usuario = await UsuarioDb.findOne({
                where: { email: email },
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            return usuario;
        } catch (error: any) {
            const newError = new Error(`Method: showByEmail; \n file: usuarioController.ts:: ${error}`);
            console.log(newError.message, { critical: false, track: newError.stack });
            return null; // Retornar null em caso de erro
        }
    },

    async create(data: UsuarioDb) {

        try {
            if (data) {

                //cria o hash da senha submetida
                const hashPassword = hashMe(cipher.criptografa(data.senha));

                const usuario = await UsuarioDb.create({
                    nome: data.nome,
                    email: data.email,
                    cpf: data.cpf,
                    celular: data.celular,
                    data_nasc: data.data_nasc,
                    genero: data.genero,
                    senha: hashPassword
                });
                return usuario
            }

        } catch (error: any) {
            const newError = new Error(`Method: create; \n file: usuarioController.ts:: ${error}`);
            console.log(newError.message, { critical: false, track: newError.stack })
            return { error: true, status: 500, message: newError.message }
        }

    },
    async update(usuario_id: number, data: UsuarioDb) {
        try {
            if (usuario_id && data) {
                const usuario = await UsuarioDb.findOne({
                    where: {
                        id: usuario_id
                    }
                });
                if (!usuario) {
                    throw new Error('Usuário não encontrado.');
                }
                return usuario.update(data);
            }

        } catch (error: any) {
            const newError = new Error(`Method: update; \n file: usuarioController.ts:: ${error}`);
            console.log(newError.message, { critical: false, track: newError.stack })
            return { error: true, status: 500, message: newError.message }
        }
    },

    async delete(id: number) {
        try {
            if (id) {
                const usuario = await UsuarioDb.findByPk(id);
                if (!usuario) {
                    throw new Error('Usuário não encontrado.');
                }
                await usuario.destroy();
                return { message: 'Usuário deletado com sucesso.' };
            }

        } catch (error: any) {
            const newError = new Error(`Method: delete; \n file: usuarioController.ts:: ${error}`);
            console.log(newError.message, { critical: false, track: newError.stack })
            return { error: true, status: 500, message: newError.message }
        }
    }
}

export default usuarios;
