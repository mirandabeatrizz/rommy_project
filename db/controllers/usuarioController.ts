
import Models from "../models/index";
import { Usuario as UsuarioDb } from "../models/usuario";

// Função para buscar todos os usuários
export const getUsuarios = async () => {
  return await Models.Usuario.findAll();
};

// Função para criar um novo usuário
export const createUsuario = async (dados: Partial<UsuarioDb>) => {
    console.log(dados)
  return await Models.Usuario.create(dados);
};

// Função para buscar um usuário pelo ID
export const getUsuarioById = async (id: number) => {
  const usuario = await Models.Usuario.findByPk(id);
  if (!usuario) throw new Error('Usuário não encontrado.');
  return usuario;
};

// Função para atualizar um usuário pelo ID
export const updateUsuario = async (id: number, dados: Partial<UsuarioDb>) => {
  const usuario = await Models.Usuario.findByPk(id);
  if (!usuario) throw new Error('Usuário não encontrado.');
  await usuario.update(dados);
  return usuario;
};

// Função para deletar um usuário pelo ID
export const deleteUsuario = async (id: number) => {
  const usuario = await Models.Usuario.findByPk(id);
  if (!usuario) throw new Error('Usuário não encontrado.');
  await usuario.destroy();
  return { message: 'Usuário deletado com sucesso.' };
};
