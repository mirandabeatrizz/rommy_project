import Link from "next/link";

interface SelectCardProps {
  id: number;
  titulo: string;
  cidade: string;
  bairro: string;
  aluguel: number;
}

export default function Card({
  id,
  titulo,
  cidade,
  bairro,
  aluguel,
}: SelectCardProps) {
  return (
    <div className="bg-[#fbfbfbcc] flex flex-col w-full rounded-xl p-2.5 gap-2 shadow-xl text-black border-[1px] md:shrink-0">
      <p className="text-[#0A2E4D] font-semibold">{titulo}</p>
      <div className="text-xs">
        <p>{cidade}</p>
        <p>{bairro}</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="italic">R${aluguel.toFixed(2).replace(".", ",")}</p>
        <Link href={`/imovelpage?${id}`}>
          <button className="bg-[#0A2E4D] rounded-md text-xl w-8 h-8 font-semibold text-white flex justify-center items-center hover:bg-[#1c65a4] transition duration-300">
            +
          </button>
        </Link>
      </div>
    </div>
  );
}
