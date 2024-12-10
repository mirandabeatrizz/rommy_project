import Menu from "@/components/menu/menu";
// import { useState } from "react";

export default function ImovelPage() {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          <h1 className="text-[#0A2E4D] font-bold text-2xl mb-6 mt-[2vh]">Detalhes do Imóvel</h1>
          
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
          <div className="w-full md:w-[60%] bg-white p-6 rounded-lg shadow-lg mb-6 border-[1px]">
            <h2 className="text-lg font-semibold mb-2">Apartamento 2 quartos</h2>
            <p className="text-sm text-gray-700 mb-4">Localizado no bairro Jardim Américo, perto de supermercados, escolas e posto de saúde!</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-1 text-sm">Valor:</h3>
              <p className="text-lg text-[#1f4d78]">R$ 2.500,00</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-1 text-sm">Endereço:</h3>
              <p className="text-sm text-gray-600">Rua Humberto de Campos, Nº 148e</p>
            </div>
          </div>

          {/* Botão ajustado com as cores especificas */}
          <button
            className="w-[60%] md:w-[40%] py-3 bg-[#eb6d6d] hover:bg-[#0e3a54] text-white text-lg rounded-lg transition duration-300"
          >
            Registrar interesse
          </button>
        </div>
      </div>
    </div>
  );
}
