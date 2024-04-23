// song route
const song_route = "/home/track"


// single route
const single_route = "/home/single"


// album route
const album_route = "/home/album"


// playlist route
const playlist_route = "/home/playlist"


// user routes
const profile_route = "/home/profile"
const settings_route = "/home/preferences"
const followed_songs = "/home/collection/tracks"
const search_route = "/home/search"


// for-authors route
const for_authors_route = "/home/for-authors"


// artist routes
const artist_route_profile = "/home/artist"
const artist_route_liked_songs = (id: string) => { return `/home/artist/${id}/liked-songs` };
const artist_route_discography_all = (id: string) => { return `/home/artist/${id}/discography/all` }
const artist_route_discography_albums = (id: string) => { return `/home/artist/${id}/discography/albums` }
const artist_route_discography_singles = (id: string) => { return `/home/artist/${id}/discography/singles` }


// storage and other routes
const storage_users = "https://huhpmogbdpibjlquvuli.supabase.co/storage/v1/object/public/users"


export {
  album_route,
  song_route,
  playlist_route,
  artist_route_profile,
  artist_route_liked_songs,
  artist_route_discography_all,
  artist_route_discography_albums,
  artist_route_discography_singles,
  followed_songs,
  storage_users,
  profile_route,
  settings_route,
  for_authors_route,
  search_route,
  single_route
}