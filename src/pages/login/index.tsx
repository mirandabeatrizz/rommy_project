import { useState } from 'react';
import axios from 'axios';
import BackgroudImage from '@/components/bgImage';
import Menu from '@/components/menu/menu';
import logo from '../../../public/images/logo.svg';
import closedEye from "../../../public/images/icons/closedEyeIcon.svg"


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { email, senha: password })

      const { token } = response.data;

      // Salve o token no localStorage ou cookies
      localStorage.setItem('token', token);

      // Redirecione para a página de listagem
      window.location.href = '/list';
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
          onSubmit={handleLogin}
          className="bg-white w-[90%] max-w-md md:max-w-lg p-8 md:p-10 rounded-2xl gap-6 shadow-lg"
        >
          <div className="text-center text-black">
            <img className="h-16 mb-4 mx-auto" src={logo.src} alt="logo" />
            <p className="font-semibold text-lg md:text-2xl">Bem-vindo de volta!</p>
            <p className="text-sm md:text-base">Acesse sua conta</p>
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="w-full flex flex-col gap-4 text-black">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm md:text-base">
                E-mail:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-3 bg-zinc-200 rounded-lg outline-none text-sm md:text-base"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm md:text-base">
                Senha:
              </label>
              <div className="flex items-center bg-zinc-200 rounded-lg px-4 py-2 w-full">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm md:text-base"
                  required
                />
                <button type="button" className="ml-2">
                  <img src={closedEye.src} alt="senha oculta" className="h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between text-sm md:text-base text-[#00000073]">
              <a href="#" className="hover:text-black">
                Esqueceu a senha
              </a>
              <a href="/register" className="hover:text-black">
                Ainda não possuo cadastro
              </a>
            </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-lg bg-[#eb6d6d] text-white text-sm md:text-lg hover:bg-[#a84d4d] transition duration-300"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
