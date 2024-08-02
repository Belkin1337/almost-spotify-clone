import { SearchRecentArtistsList } from "@/components/search/recent/artists/search-recent-artists-list";
import { Wrapper } from "@/ui/wrapper";

export default async function SearchArtistAllPage() {
  return (
    <Wrapper variant="page">
      <div className="p-6 w-full h-full">
        <SearchRecentArtistsList type="all"/>
      </div>
    </Wrapper>
  )
}