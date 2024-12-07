import image from "../../../public/images/logo.svg";

export default function Menu() {
  return (
    <div className="w-full flex fixed h-[12%] justify-between items-center p-2">
      <div>
        <img className="h-[80px]" src={image.src}></img>
      </div>
      <div className="mr-10 flex gap-8 font text-[#eb6d6d] font-bold text-lg">
        <a href="">Explorar Imóveis</a>
        <a href="">Entrar</a>
      </div>
    </div>
  );
}
