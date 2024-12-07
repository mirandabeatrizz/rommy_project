import image from "../../../public/images/logo.svg";
import Card from "@/components/card";
import SelectHome from "@/components/selectButton";
import Link from "next/link";

export default function List() {
  return (
    <div className="bg-white h-screen w-screen flex flex-col items-center gap-10">
      <div className="flex items-center mt-3">
        <Link href={"../"}>
          <img className="h-[60px]" src={image.src} />
        </Link>
        <h1 className=" text-[#eb6d6d] text-3xl font-semibold">
          OPORTUNIDADES ENCONTRADAS
        </h1>
      </div>
      <form className="flex w-1/2 flex-col gap-14 items-center">
        <div className="w-full flex justify-between">
          <SelectHome />
          <SelectHome />
          <SelectHome />
        </div>
        <div className="text-black flex w-9/12 items-center">
          <p className="  font-semibold mr-8">Ordenar por: </p>
          <div className="flex gap-5">
            <button className="bg-[#ecececf1] rounded-2xl p-2.5">
              Menor preço
            </button>
            <button className="bg-[#ecececf1] rounded-2xl p-2.5">
              Maior preço
            </button>
          </div>
        </div>
      </form>
      <div className="grid grid-cols-4 w-1/2 gap-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
