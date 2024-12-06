import searchIcon from "../../public/images/searchIcon.svg";
import BackgroudImage from "@/components/bgImage";
import Menu from "@/components/menu/menu";
import SelectHome from "@/components/selectHome";

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center">
      <BackgroudImage />
      <Menu />
      <form className="flex absolute mt-[25%] w-1/2 flex-col gap-12">
        <div className="w-full flex justify-between">
          <SelectHome />
          <SelectHome />
          <SelectHome />
        </div>
        <div className="bg-white w-full flex rounded-xl gap-4 p-2">
          <button>
            <img src={searchIcon.src} alt="searchIcon" />
          </button>
          <input
            type="text"
            className="bg-white w-full rounded-xl outline-none text-black"
          />
        </div>
      </form>
    </div>
  );
}
