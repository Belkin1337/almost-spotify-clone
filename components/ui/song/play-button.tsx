import { FaPlay } from "react-icons/fa";

export const PlayButton = () => {
  return (
    <button className="transition opacity-0 rounded-md items-center flex bg-MAIN p-4 translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale:105">
      <FaPlay className="text-black" />
    </button>
  );
}