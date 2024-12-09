import BackgroudImage from "@/components/bgImage";
import Menu from "@/components/menu/menu";
import logo from "../../../public/images/logo.svg";
import closedEye from "../../../public/images/closedEyeIcon.svg";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center">
      <BackgroudImage />
      <Menu />
      <form className="flex flex-col fixed items-center p-11 mt-[8%] bg-white w-[50%] rounded-2xl gap-9">
        <div className="text-black">
          <img className="h-[120px] mb-4" src={logo.src} alt="logo" />
          <p className="font-semibold text-2xl">Bem-vindo de volta!</p>
          <p className="text-lg">Acesse sua conta</p>
        </div>

        <div className="w-full flex flex-col gap-4  text-black">
          <div className="flex flex-col gap-2 ">
            <p>E-mail:</p>
            <input
              type="email"
              className="w-full h-12 p-3 bg-zinc-200 rounded-lg outline-none"
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <p>Senha:</p>
            <div className="flex justify-between w-full bg-zinc-200 rounded-lg p-3">
              <input
                type="password"
                className="w-full h-5 bg-zinc-200 outline-none"
              ></input>
              <button>
                <img src={closedEye.src} alt="senha oculta" />
              </button>
            </div>
          </div>
          <div className="flex gap-5 w-full text-[#00000073]">
            <p>Esqueceu a senha</p>
            <p>Ainda não possuo cadastro</p>
          </div>
        </div>

        <button className="w-full py-3 rounded-lg bg-[#eb6d6d] text-white text-xl hover:bg-[#a84d4d] transition duration-300">
          Entrar
        </button>
      </form>
    </div>
  );
}
