import { useState } from 'react';
import axios from 'axios';
import BackgroudImage from '@/components/bgImage';
import Menu from '@/components/menu/menu';
import logo from '../../../public/images/logo.svg';
import closedEye from '../../../public/images/icons/closedEyeIcon.svg';

function initialState() {
    return {
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        celular: '',
        data_nasc: '',
        genero: '',
        estudante: false,
        matricula: '',
        instituicao: '',
    };
}


export default function CadastroUsuario() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialState());

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        setData({ ...data, [name]: value });
    }

    console.log(data)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/usuarios/', data);
            const { token } = response.data;

            // Salve o token no localStorage ou cookies
            localStorage.setItem('token', token);

            // Redirecione para a página de login 
            window.location.href = '/login';
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao fazer login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-screen overflow-auto">
            <div className="absolute inset-0 bg-cover bg-center z-[-1]">
                <BackgroudImage />
            </div>

            <Menu />

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <form
                    style={{ width: '70%', backgroundColor: 'white', borderRadius: '10px', padding: '32px 0' }}
                    onSubmit={handleSubmit}
                // className="bg-white w-[90%] max-w-md md:max-w-lg p-8 md:p-10 rounded-2xl gap-6 shadow-lg"
                >
                    <div className="text-center text-black" style={{padding: '10px'}}>
                        <img className="h-16 mb-4 mx-auto" src={logo.src} alt="logo" />
                        <p className="font-semibold text-lg md:text-2xl">Seja Bem-vindo!</p>
                        <p className="text-sm md:text-base">Informe seus dados para criar uma conta</p>
                    </div>

                    {error && <p className="text-red-600 text-center">{error}</p>}

                    <div className="w-full flex flex-col gap-4 text-black"
                        style={{ width: '90%', margin: 'auto', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
                    >
                        <div className="flex flex-col gap-2"
                            style={{ width: '45%' }}
                        >
                            <label htmlFor="email" className="text-sm md:text-base">
                                Nome:
                            </label>
                            <input
                                id="nome"
                                name='nome'
                                type="text"
                                value={data.nome}
                                 onChange={handleChange}
                                className="w-full h-12 px-3 bg-zinc-200 rounded-lg outline-none text-sm md:text-base"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2"
                            style={{ width: '45%' }}>
                            <label htmlFor="email" className="text-sm md:text-base">
                                E-mail:
                            </label>
                            <input
                                id="email"
                                type="email"
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                className="w-full h-12 px-3 bg-zinc-200 rounded-lg outline-none text-sm md:text-base"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2" style={{ width: '45%' }}>
                            <label htmlFor="email" className="text-sm md:text-base">
                                Celular:
                            </label>
                            <input
                                id="celular"
                                type="text"
                                name='celular'
                                value={data.celular}
                                onChange={handleChange}
                                className="w-full h-12 px-3 bg-zinc-200 rounded-lg outline-none text-sm md:text-base"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2" style={{ width: '45%' }}>
                            <label htmlFor="cpf" className="text-sm md:text-base">
                                CPF:
                            </label>
                            <input
                                id="cpf"
                                name='cpf'
                                type="text"
                                value={data.cpf}
                                 onChange={handleChange}
                                className="w-full h-12 px-3 bg-zinc-200 rounded-lg outline-none text-sm md:text-base"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2" style={{ width: '45%' }}>
                            <label htmlFor="data_nasc" className="text-sm md:text-base">
                                Data Nascimento:
                            </label>
                            <input
                                id="data_nasc"
                                type="text"
                                name='data_nasc'
                                value={data.data_nasc}
                                onChange={handleChange}
                                className="w-full h-12 px-3 bg-zinc-200 rounded-lg outline-none text-sm md:text-base"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2" style={{ width: '45%' }}>
                            <label htmlFor="cpf" className="text-sm md:text-base">
                                Genero:
                            </label>
                            <select name="genero" id="" className="w-full h-12 px-3 bg-zinc-200 rounded-lg outline-none text-sm md:text-base">
                                <option value="0">Masculino</option>
                                <option value="1">Feminino</option>
                                <option value="1">Prefiro não informar</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2" style={{ width: '45%' }}>
                            <label htmlFor="password" className="text-sm md:text-base">
                                Senha:
                            </label>
                            <div className="flex items-center bg-zinc-200 rounded-lg px-4 py-2 w-full">
                                <input
                                    id="senha"
                                    type="password"
                                    name='senha'
                                    value={data.senha}
                                    onChange={handleChange}
                                    className="flex-1 bg-transparent outline-none text-sm md:text-base"
                                    required
                                />
                                <button type="button" className="ml-2">
                                    <img src={closedEye.src} alt="senha oculta" className="h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2" style={{ width: '45%' }}>
                            <label htmlFor="password" className="text-sm md:text-base">
                                Estudante:
                            </label>
                            <div className="flex items-center bg-zinc-200 rounded-lg px-4 py-2 w-full">
                             <input type="checkbox" name="" id="" className="flex items-center bg-zinc-200 rounded-lg px-4 py-2 w-full"/>
                            </div>
                        </div>
                    </div>

                    <div  style={{ width: '80%', margin: 'auto' }}>
                        <button
                            type="submit"
                            disabled={loading}
                           
                            className="w-full py-3 mt-4 rounded-lg bg-[#eb6d6d] text-white text-sm md:text-lg hover:bg-[#a84d4d] transition duration-300"
                        >
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
