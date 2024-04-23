import { SearchArtistList } from "@/components/lists/search/components/search-page-artist-list";
import { Wrapper } from "@/ui/wrapper";

export default async function SearchArtistAllPage() {
  return (
    <Wrapper variant="page">
      <div className="p-6 w-full h-full">
        <SearchArtistList type="all"/>
      </div>
    </Wrapper>
  )
}