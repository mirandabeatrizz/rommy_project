import arrowDown from "../../../public/images/arrowDownIcon.svg";
import arrowUp from "../../../public/images/arrowUpIcon.svg";

export default function SelectHome() {
  return (
    <button className="text-black flex bg-white w-[160px] rounded-xl h-8 p-2 text-sm justify-center gap-5 items-center">
      Cidade
      <img src={arrowDown.src} alt="" />
    </button>
  );
}
