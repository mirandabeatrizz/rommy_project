import searchIcon from "../../public/images/searchIcon.svg";
import BackgroudImage from "@/components/bgImage";
import Menu from "@/components/menu/menu";
import SelectHome from "@/components/selectButton";
import Link from "next/link";
import { GetServerSideProps } from "next";

interface HomeProps {
  tiposDeImoveis: string[];
}

export default function Home({ tiposDeImoveis }: HomeProps) {
  return (
    <div className="h-screen w-screen flex justify-center">
      <BackgroudImage />
      <Menu />
      <form className="flex absolute mt-[25%] w-1/2 flex-col gap-12">
        <div className="w-full flex justify-between">
          <SelectHome
            defaultValue={""}
            firstoption={"Cidade"}
            options={["Chapecó", "Florianópolis", "Palhoça"]}
          />
          <SelectHome
            defaultValue={""}
            firstoption={"Valor"}
            options={["R$1000", "R$2000", "R$3000"]}
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
    const response = await fetch("http://localhost:3000/api/tipos");
    const data = await response.json();

    if (data && Array.isArray(data.list)) {
      const tiposDeImoveis = data.list.map(
        (item: { nome: string }) => item.nome
      );

      return {
        props: {
          tiposDeImoveis,
        },
      };
    } else {
      console.error("data.list não é um array ou está ausente.");
      return {
        props: {
          tiposDeImoveis: [],
        },
      };
    }
  } catch (error) {
    console.error("Erro ao buscar os tipos de imóveis:", error);
    return {
      props: {
        tiposDeImoveis: [],
      },
    };
  }
};