interface SelectHomeProps {
  defaultValue: string;
  firstoption: string;
  options?: string[];
}

export default function SelectHome({
  defaultValue,
  firstoption,
  options = [],
}: SelectHomeProps) {
  return (
    <select className="select select-bordered select-lg w-[250px] max-w-xs bg-white text-black">
      <option disabled selected className="text-[#0a2e4d67] font-semibold">
        {firstoption}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {" "}
          {option}{" "}
        </option>
      ))}
    </select>
  );
}
