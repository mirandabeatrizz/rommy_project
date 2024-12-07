export default function SelectHome() {
  return (
    <select className="select select-bordered select-lg w-[250px] max-w-xs bg-white text-black">
      <option disabled selected className="text-[#0a2e4d67] font-semibold">
        Cidade
      </option>
      <option>Chapecó</option>
      <option>Passo Fundo</option>
    </select>
  );
}
