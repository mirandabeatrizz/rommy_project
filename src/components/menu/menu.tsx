import Link from "next/link";
import image from "../../../public/images/logo.svg";
import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="w-full flex fixed h-[12%] justify-between items-center p-2">
      <div>
        <Link href={"./"}>
          <img className="h-[80px]" src={image.src} alt="Logo" />
        </Link>
      </div>
      <div className="mr-10 flex gap-8 font text-[#eb6d6d] font-bold text-lg">
        <Link href="./">Explorar Imóveis</Link>

        {/* Entrar só aparece quando não está na página de login */}

        {pathname !== "/auth" && (
          <>
            <Link href="./auth">Entrar</Link>
          </>
          
        )}
      </div>
      
    </div>
    
  );
}
