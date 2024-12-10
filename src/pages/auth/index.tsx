import BackgroudImage from "@/components/bgImage";
import Menu from "@/components/menu/menu";
import logo from "../../../public/images/logo.svg";
import closedEye from "../../../public/images/closedEyeIcon.svg";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-screen overflow-auto">
      {/* Imagem de fundo com rolagem */}
      <div className="absolute inset-0 bg-cover bg-center z-[-1]">
        <BackgroudImage />
      </div>

      {/* Menu */}
      <Menu />

      {/* Conteúdo da página com rolagem permitida */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <form className="bg-white w-[90%] max-w-md md:max-w-lg p-8 md:p-10 rounded-2xl gap-6 shadow-lg">
          {/* Conteúdo do Formulário */}
          <div className="text-center text-black">
            <img
              className="h-16 mb-4 mx-auto"
              src={logo.src}
              alt="logo"
            />
            <p className="font-semibold text-lg md:text-2xl">Bem-vindo de volta!</p>
            <p className="text-sm md:text-base">Acesse sua conta</p>
          </div>

          <div className="w-full flex flex-col gap-4 text-black">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm md:text-base">
                E-mail:
              </label>
              <input
                id="email"
                type="email"
                className="w-full h-12 px-3 bg-zinc-200 rounded-lg outline-none text-sm md:text-base"
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
                  className="flex-1 bg-transparent outline-none text-sm md:text-base"
                />
                <button type="button" className="ml-2">
                  <img src={closedEye.src} alt="senha oculta" className="h-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between text-sm md:text-base text-[#00000073]">
              <a href="#" className="hover:text-black">
                Esqueceu a senha
              </a>
              <a href="#" className="hover:text-black">
                Ainda não possuo cadastro
              </a>
            </div>
          </div>

          <button className="w-full py-3 mt-4 rounded-lg bg-[#eb6d6d] text-white text-sm md:text-lg hover:bg-[#a84d4d] transition duration-300">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
