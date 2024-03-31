import { SearchArtistList } from "@/components/lists/search/child/artist-list";

export default async function SearchArtistAllPage() {
  return (
    <div className="p-6 w-full h-full">
      <SearchArtistList type="all" />
    </div>
  )
}