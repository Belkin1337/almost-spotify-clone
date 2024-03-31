"use client"

import { SongItemMain } from "@/components/song/main/song-item";
import { SongItem } from "@/components/song/song-item";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user"
import { getSongsByUserId } from "@/lib/queries/song/get-songs-by-userId";
import { createClient } from "@/lib/utils/supabase/client";
import { SongEntity } from "@/types/entities/song";
import { Input } from "@/ui/input";
import { Typography } from "@/ui/typography";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Check } from "lucide-react";
import { ArtistEntity } from "@/types/entities/artist";
import { getArtistsByUserId } from "@/lib/queries/artist/get-artists-by-user";
import { ArtistImage } from "@/components/artist/card/child/artist-image";
import { ArtistName } from "@/components/artist/card/child/artist-name";
import { SongEdit } from "@/components/song/edit/song-edit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/ui/dropdown-menu";
import { 
  OrderType, 
  orderTypeList, 
  SongsType, 
  songsTypeList, 
  ViewType, 
  viewTypeList 
} from "@/lib/constants/sort-songs";
import { Wrapper } from "@/ui/wrapper";

const supabase = createClient();

export const UserTracksList = () => {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('compact');
  const [orderType, setOrderType] = useState<OrderType>('from_the_end');
  const [songsType, setSongsType] = useState<SongsType>('all');
  const [selectedArtistId, setSelectedArtistId] = useState<string>('');

  const searchRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();

  const { data: userSongs } = useQuery<SongEntity[]>(getSongsByUserId({
    client: supabase,
    userId: user?.id!,
    order: orderType
  },), {
    enabled: !!user?.id && songsType === 'all'
  });

  const { data: artists } = useQuery<ArtistEntity[]>(getArtistsByUserId(supabase, user?.id!), {
    enabled: !!user?.id! || songsType === 'by_artist'
  });

  const handleSort = useCallback((
    type: 'orderType' | 'viewType' | 'songsType',
    value: OrderType | ViewType | SongsType
  ) => {
    switch (type) {
      case 'orderType':
        setOrderType(value as OrderType);
        break;
      case 'viewType':
        setViewType(value as ViewType);
        break;
      case 'songsType':
        setSongsType(value as SongsType);
        break;
      default:
        break;
    }
  }, []);

  const songs = useCallback((songsType?: SongsType, artistId?: string) => {
    if (songsType === 'all') {
      return userSongs;
    } else if (songsType === 'by_artist' && artistId) {
      return userSongs?.filter(song => song.artists?.includes(artistId));
    }

    return [];
  }, [userSongs]);

  useEffect(() => {
    console.log(songsType, viewType, orderType, selectedArtistId)
  }, [songsType, viewType, orderType, selectedArtistId])

  if (!user) return;

  return (
    <Wrapper variant="page" className="gap-y-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-4 overflow-hidden">
          <div
            onClick={() => setIsOpenInput(!isOpenInput)}
            className={`hover:bg-neutral-700/60 cursor-pointer p-1 rounded-full flex items-center justify-center 
              ${isOpenInput ? 'hidden' : 'transition'}`}
          >
            <BiSearch size={26} />
          </div>
          <div ref={searchRef} className={`flex items-center bg-neutral-700/50 pl-2 pr-1 py-1 rounded-md 
            ${isOpenInput ? 'animate-slide-out' : 'animate-slide-in transition delay-600 ease-in-out hidden'}`}>
            <BiSearch size={26} />
            <Input
              name="search_followed"
              className="h-[32px] bg-transparent"
              placeholder="Search in playlist"
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col self-end">
            <div className="flex items-center gap-4">
              <Typography>
                Недавние
              </Typography>
              {viewTypeList.find(item => item.type === viewType)?.icon()}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-start w-[280px] right-6 top-2 relative">
            <Typography className="p-2 text-sm !text-neutral-400 font-semibold">
              Фильтировать по
            </Typography>
            {songsTypeList.map(item => (
              <div
                key={item.type}
                className="flex p-2 items-center justify-between hover:bg-neutral-800 w-full rounded-md">
                {item.type as SongsType === 'by_artist' ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-start w-full">
                      <Typography className={item.type as SongsType === songsType ? '!text-jade-500' : 'text-white'}>
                        {item.name}
                      </Typography>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="relative right-[280px] top-[10px]">
                      {artists?.map((artist) => (
                        <div
                          key={artist.id}
                          onClick={() => {
                            setSelectedArtistId(artist.id);
                            handleSort('songsType', item.type as SongsType)
                          }}
                          className="flex items-center gap-x-2 rounded-md p-2 w-full hover:bg-neutral-800"
                        >
                          <ArtistImage
                            variant="select"
                            artist={artist}
                          />
                          <ArtistName
                            variant="select"
                            artist={artist}
                            className={`${selectedArtistId === artist.id && '!text-jade-500'}`}
                          />
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="w-full">
                    <Typography
                      onClick={() => {
                        setSelectedArtistId('');
                        handleSort('songsType', item.type as SongsType);
                      }}
                      className={item.type as SongsType === songsType ? '!text-jade-500' : 'text-white'}>
                      {item.name}
                    </Typography>
                  </div>
                )}
                {item.type as SongsType === songsType && (
                  <Check size={18} className="text-jade-500" />
                )}
              </div>
            ))}
            <DropdownMenuSeparator />
            <Typography className="p-2 text-sm !text-neutral-400 font-semibold">
              Сортировать по
            </Typography>
            {orderTypeList.map(item => (
              <div
                key={item.type}
                onClick={() => handleSort('orderType', item.type as OrderType)}
                className="flex p-2 justify-between items-center hover:bg-neutral-800 w-full rounded-md"
              >
                <Typography className={item.type as OrderType === orderType ? '!text-jade-500' : 'text-white'}>
                  {item.name}
                </Typography>
                {item.type as OrderType === orderType && (
                  <Check size={18} className="text-jade-500" />
                )}
              </div>
            ))}
            <DropdownMenuSeparator />
            <Typography className="p-2 text-sm !text-neutral-400 font-semibold">
              Вид
            </Typography>
            {viewTypeList.map(item => (
              <div
                key={item.type}
                onClick={() => handleSort('viewType', item.type as ViewType)}
                className="flex justify-between items-center p-2 hover:bg-neutral-800 w-full rounded-md"
              >
                <div className="flex gap-x-2 items-center">
                  {item.icon && item.icon()}
                  <Typography className={`${viewType === item.type ? '!text-jade-500' : 'text-white'}`}>
                    {item.name}
                  </Typography>
                </div>
                {item.type as ViewType === viewType && (
                  <Check size={18} className="text-jade-500" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={`w-full h-full gap-4
        ${viewType === 'grid' && 'grid md:grid-cols-3 lg:grid-cols-4 auto-rows-auto'}
        ${viewType === 'compact' && 'flex flex-col items-start'}
        ${viewType === 'list' && 'flex flex-col items-start'}`}
      >
        {userSongs ? (
          songs(songsType, selectedArtistId)?.length! > 0 ? (
            songs(songsType, selectedArtistId)?.map((song, idx) => (
              <>
                {viewType === 'grid' && (
                  <SongItemMain
                    key={song.id}
                    song={song}
                  >
                    <SongEdit song={song} />
                  </SongItemMain>
                )}
                {viewType === 'list' && (
                  <SongItem
                    key={song.id}
                    song={song}
                    type="edit"
                    list={{
                      id: String(idx + 1),
                      data: userSongs
                    }}
                  >
                    <SongEdit song={song} />
                  </SongItem>
                )}
                {viewType === 'compact' && (
                  <SongItem
                    key={song.id}
                    song={song}
                    variant="compact"
                    type="edit"
                    list={{
                      id: String(idx + 1),
                      data: userSongs
                    }}
                  >
                    <SongEdit song={song} />
                  </SongItem>
                )}
              </>
            ))
          ) : (
            <Typography>
              Треки не найдены.
            </Typography>
          )
        ) : (
          <Typography>
            Треки не найдены.
          </Typography>
        )}
      </div>
    </Wrapper>
  )
}