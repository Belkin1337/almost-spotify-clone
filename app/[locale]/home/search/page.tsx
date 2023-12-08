import getSongsByTitle from "@/actions/get-songs-by-title"
import { Navbar } from "@/components/navbar/navbar";
import { SearchInput } from "@/components/ui/search-input";
import { SearchContent } from "./components/search";

interface SearchProps {
  searchParams: {
    title: string,
  }
}

export  const revalidate = 0;

export default async function Search({ searchParams }: SearchProps) {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="bg-DARK_SECONDARY_BACKGROUND rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Navbar>
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Поиск...</h1>
          <SearchInput />
        </div>
      </Navbar>
      <SearchContent songs={songs}/>
    </div>
  )
}