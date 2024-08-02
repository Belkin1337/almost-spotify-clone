export const song_route = (id: string) => { return `/track/${id}` }
export const single_route = (id: string) => { return `/single/${id}` }
export const album_route = (id: string) => { return `/album/${id}` }
export const playlist_route= (id: string) => { return `/playlist/${id}` }

export const profile_route = (id: string) => { return `/user/${id}` }
export const profile_route_following = (id: string) => { return `/user/${id}/following` }
export const profile_route_followers = (id: string) => { return `/user/${id}/followers` }

export const home_route = "/home";
export const settings_route = "/preferences"
export const followed_songs = "/collection/tracks"
export const search_route = "/search"
export const search_route_all_artist = "/search/all-artists"
export const auth_route = "/auth";

export const for_authors_route = "/for-authors"
export const for_authors_route_create_song = "/for-authors/create-song"
export const for_authors_route_create_album = "/for-authors/create-album"
export const for_authors_route_create_artist = "/for-authors/create-artist"

export const for_authors_route_artists = (id: string) => { return `${profile_route(id)}/artists` }

export const for_authors_route_tracks = (id: string) => { return `${profile_route(id)}/tracks` }

export const for_authors_route_albums = (id: string) => { return `${profile_route(id)}/albums` }

export const genre_route = (id: string) => { return `/genre/${id}` }

export const artist_route_profile = (id: string) => { return `/artist/${id}` }

export const artist_route_liked_songs = (id: string) => { return `/artist/${id}/liked-songs` };
export const artist_route_discography_all = (id: string) => { return `/artist/${id}/discography/all` }
export const artist_route_discography_albums = (id: string) => { return `/artist/${id}/discography/albums` }
export const artist_route_discography_singles = (id: string) => { return `/artist/${id}/discography/singles` }