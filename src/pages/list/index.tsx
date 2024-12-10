import image from "../../../public/images/logo.svg";
import Card from "@/components/card";
import SelectHome from "@/components/selectButton";
import Link from "next/link";
import { GetServerSideProps } from "next";

interface ListProps {
  tiposDeImoveis: string[];
  cidades: string[];
  bairros: string[];
}

export default function List({ tiposDeImoveis, cidades, bairros }: ListProps) {
  return (
    <div className="bg-white w-screen flex flex-col items-center gap-10">
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
          <SelectHome
            defaultValue={""}
            firstoption={"Cidade"}
            options={Array.isArray(cidades) ? cidades : []}
          />
          <SelectHome
            defaultValue={""}
            firstoption={"Bairro"}
            options={Array.isArray(bairros) ? bairros : []}
          />
          <SelectHome
            defaultValue={""}
            firstoption={"Tipo"}
            options={Array.isArray(tiposDeImoveis) ? tiposDeImoveis : []}
          />
        </div>
        <div className="text-black flex w-9/12 items-center">
          <p className="  font-semibold mr-8">Ordenar por: </p>
          <div className="flex gap-5">
            <button className="bg-[#ecececf1] rounded-2xl p-2.5 hover:bg-[#bcbcbcfd] hover:text-white hover:text-semibold transition duration-300">
              Menor preço
            </button>
            <button className="bg-[#ecececf1] rounded-2xl p-2.5 hover:bg-[#bcbcbcfd] hover:text-white hover:text-semibold transition duration-300">
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
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Consultando endereços
    const responseEnderecos = await fetch(
      "http://localhost:3000/api/enderecos"
    );
    const dataEnderecos = await responseEnderecos.json();

    //filtrando cidades
    const cidades = dataEnderecos.list.map(
      (item: { cidade: string }) => item.cidade
    );
    //filtrando bairros
    const bairros = dataEnderecos.list.map(
      (item: { bairro: string }) => item.bairro
    );

    // Consultando os tipos de imóveis
    const responseTipos = await fetch("http://localhost:3000/api/tipos");
    const dataTipos = await responseTipos.json();

    const tiposDeImoveis = dataTipos.list.map(
      (item: { nome: string }) => item.nome
    );

    return {
      props: {
        cidades,
        bairros,
        tiposDeImoveis,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return {
      props: {
        cidades: [],
        bairros: [],
        tiposDeImoveis: [],
      },
    };
  }
};
