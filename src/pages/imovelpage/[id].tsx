import Menu from "@/components/menu/menu";
import { GetServerSideProps } from "next";
// import { useState } from "react";
import { useRouter } from "next/router";

interface ImovelPageProps {
  dataImovel: {
    id: number;
    endereco_id: string;
    tipoImovel_id: string;
    titulo: string;
    descricao: string;
    qtd_quartos: number;
    qtd_banheiros: number;
    vagas: number;
    ocupado: boolean;
    aluguel: number;
    condominio: number;
    tamanho: number;
    ocupacao_max: number;
  };
  dataEndereco: {
    id: number;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  dataTipo: {
    id: number;
    nome: string;
  };
}

export default function ImovelPage({
  dataImovel,
  dataEndereco,
  dataTipo,
}: ImovelPageProps) {
  // const router = useRouter();
  // const { id } = router.query;

  // const images = [
  //   "https://via.placeholder.com/600x400.png?text=Imagem+1",
  //   "https://via.placeholder.com/600x400.png?text=Imagem+2",
  //   "https://via.placeholder.com/600x400.png?text=Imagem+3",
  // ];

  // const goToNextImage = () => {
  //   setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  // };

  // const goToPreviousImage = () => {
  //   setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  // };

  return (
    <div className="w-screen bg-white min-h-[100vh]">
      <div className="imovel-page-container">
        <Menu />
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-[#0A2E4D] font-bold text-2xl mb-6 mt-[2vh]">
            Detalhes do Imóvel {}
          </h1>

          {/* <div className="w-full md:w-[60%] h-[300px] bg-gray-200 rounded-lg overflow-hidden relative mb-6">
            <img
              src={images[currentImageIndex]}
              alt="Carrossel"
              className="h-full w-full object-cover transition-all duration-500"
            />
            
            <button
              onClick={goToPreviousImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Anterior
            </button>

            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Próximo
            </button>
          </div> */}

          {/* Informações do imóvel */}
          <div className="flex flex-col gap-6 w-full md:w-[70%] bg-white p-6 rounded-lg shadow-lg mb-6 border-[1px]">
            <h2 className="text-lg font-semibold mb-2">
              TITULO DO IMOVEL
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              tipo imovel, DESCRIÇÃO
            </p>

            <div className="grid grid-cols-3">
              <div className="flex gap-3">
              iconQuartos <p>qtd_quartos</p>
              </div>

              <div className="flex gap-3">
              iconBanheiro <p>qtd_banheiros</p>
              </div>

              <div className="flex gap-3">
              iconGaragem <p>vagas</p>
              </div>

              <div className="flex gap-3">
              IconArea <p>condominio</p>
              </div>

              <div className="flex gap-3">
              iconPessoas <p> ocupacao_max</p>
              </div>
            </div>

          <div className="grid grid-cols-3">
            <div className="mb-4">
              <h3 className="font-semibold mb-1 text-sm">aluguel:</h3>
              <p className="text-lg text-[#1f4d78]">R$ 2.500,00</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-1 text-sm">condominio:</h3>
              <p className="text-lg text-[#1f4d78]">R$ 2.500,00</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-1 text-sm">Valor total:</h3>
              <p className="text-lg text-[#1f4d78]">R$ 2.500,00</p>
            </div>
          </div>
            

            <div className="mb-4">
              <h3 className="font-semibold mb-1 text-sm">Endereço:</h3>
              <p className="text-sm text-gray-600">
                Rua Humberto de Campos, Nº 148e
              </p>
            </div>
          </div>

          {/* Botão ajustado com as cores especificas */}
          <button className="mb-[3vh] w-[60%] md:w-[40%] py-3 bg-[#eb6d6d] hover:bg-[#0e3a54] text-white text-lg rounded-lg transition duration-300">
            Registrar interesse
          </button>

          <div>
            <h2 className="text-[#1f4d78] text-2xl">Interesses Relacionados</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params || {};

    if (!id || typeof id !== "string") {
      throw new Error("Invalid id");
    }

    //Consultado imóvel do id
    const responseImovel = await fetch(
      `http://localhost:3000/api/imoveis/${id}`
    );
    const dataImovel = await responseImovel.json();

    // Consultando endereço do imóvel
    const responseEndereco = await fetch(
      `http://localhost:3000/api/enderecos/${dataImovel.endereco_id}`
    );
    const dataEndereco = await responseEndereco.json();

    //Consultando tipo do imóveil
    const responseTipos = await fetch(
      `http://localhost:3000/api/tipos/${dataImovel.tipoImovel_id}`
    );
    const dataTipo = await responseTipos.json();

    return {
      props: {
        dataEndereco,
        dataTipo,
        dataImovel,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return {
      props: {
        dataEndereco: null,
        dataTipo: null,
        dataImovel: null,
      },
    };
  }
};
