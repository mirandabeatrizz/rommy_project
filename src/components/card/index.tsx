export default function Card() {
  return (
    <div className="bg-[#fbfbfbcc] flex flex-col w-full rounded-xl p-2.5 gap-2 shadow-xl text-black border-[1px]">
      <p className="text-[#0A2E4D] font-semibold">Titulo aqui do imovel</p>
      <div className="text-xs">
        <p>Bairro</p>
        <p>Rua</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="italic">R$1.000,00</p>
        <button className="bg-[#0A2E4D] rounded-md text-xl w-8 h-8 font-semibold text-white flex justify-center items-center">
          +
        </button>
      </div>
    </div>
  );
}
