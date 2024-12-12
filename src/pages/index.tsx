import searchIcon from "../../public/images/icons/searchIcon.svg";
import BackgroudImage from "@/components/bgImage";
import Menu from "@/components/menu/menu";
import SelectHome from "@/components/selectButton";
import Link from "next/link";
import { GetServerSideProps } from "next";

interface HomeProps {
  tiposDeImoveis: string[];
  cidades: string[];
  bairros: string[];
}

export default function Home({ tiposDeImoveis, cidades, bairros }: HomeProps) {
  return (
    <div className="h-screen w-screen flex justify-center">
      <BackgroudImage />
      <Menu />
      <form className="flex absolute mt-[25%] w-[70%] flex-col gap-12">
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
        <div className="bg-white w-full flex rounded-xl gap-4 p-2">
          <Link href="/list">
            <img src={searchIcon.src} alt="searchIcon" />
          </Link>
          <input
            type="text"
            className="bg-white w-full rounded-xl outline-none text-black"
          />
        </div>
      </form>
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
