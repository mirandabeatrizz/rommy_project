
import Models from "../models/index";
import { Usuario as UsuarioDb } from "../models/usuario";


const usuarios = {

    async list() {
        try {
            const usuarios = await UsuarioDb.findAll().then((response: UsuarioDb[]) => {
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

    async show(id: number) {
        try {

            const usuario = await UsuarioDb.findOne({
                where: { idusuario: id }
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

    async create(data: UsuarioDb) {

        try {
            if (data) {
                const usuario = await Models.Usuario.create({
                    nome: data.nome,
                    email: data.email,
                    cpf: data.cpf,
                    telefone: data.telefone,
                    data_nasc: data.data_nasc,
                    genero: data.genero,
                    tipo: data.tipo,
                    senha: data.senha
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
                        idusuario: usuario_id
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
            if(id){
                const usuario = await UsuarioDb.findByPk(id);
                if (!usuario){
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
