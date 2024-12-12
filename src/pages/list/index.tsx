import image from "../../../public/images/logo.svg";
import Card from "@/components/card";
import SelectHome from "@/components/selectButton";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Menu from "@/components/menu/menu";

interface ListProps {
  tiposDeImoveis: string[];
  cidades: string[];
  bairros: string[];
  dataImoveis: any[];
}

export default function List({
  tiposDeImoveis,
  cidades,
  bairros,
  dataImoveis,
}: ListProps) {
  return (
    <div className="bg-white h-screen w-screen flex flex-col items-center gap-10">
      <Menu />
      <div className="flex items-center mt-[5vh]">
        <h1 className=" text-[#eb6d6d] text-3xl font-semibold">
          OPORTUNIDADES ENCONTRADAS
        </h1>
      </div>
      <form className="flex w-[70%] flex-col gap-14 items-center">
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
        <div className="text-black flex w-10/12 items-center">
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
      <div className="grid grid-cols-4 w-[70%] gap-5">
        {/* {dataImoveis.map((data) => (
          <Card
            key={data.id}
            id={data.id}
            titulo={data.titulo}
            cidade={cidades[data.endereco_id - 1]}
            bairro={bairros[data.endereco_id - 1]}
            aluguel={data.aluguel}
          />
        ))} */}
       <Card
            key={1}
            id={1}
            titulo={"AAAAAAAAAA"}
            cidade={"CHapecó"}
            bairro={"Jardim Itália"}
            aluguel={100000}
          />
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

    const responseImoveis = await fetch("http://localhost:3000/api/imoveis");
    const dataImoveis = await responseImoveis.json();

    return {
      props: {
        cidades,
        bairros,
        tiposDeImoveis,
        dataImoveis: dataImoveis.list,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return {
      props: {
        cidades: [],
        bairros: [],
        tiposDeImoveis: [],
        dataImoveis: [],
      },
    };
  }
};
