import { Input } from "@/ui/input";
import { memo, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

export const LikedSongsSearch = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="flex items-center gap-x-4 overflow-hidden">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`hover:bg-neutral-700/60 cursor-pointer p-1 rounded-full flex items-center justify-center 
        ${isOpen ? 'hidden' : 'transition'}`}
      >
        <BiSearch size={26} />
      </div>
      <div ref={searchRef} className={`flex items-center bg-neutral-700/50 pl-2 pr-1 py-1 rounded-md 
      ${isOpen ? 'animate-slide-in' : 'animate-slide-out transition delay-600 ease-in-out hidden'}`}>
        <BiSearch size={26} />
        <Input
          name="search_followed"
          className="h-[32px] bg-transparent"
          placeholder="Search in playlist"
        />
      </div>
    </div>
  )
})

LikedSongsSearch.displayName === 'LikedSongsSearch'