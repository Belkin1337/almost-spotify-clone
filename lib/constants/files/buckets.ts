export const BUCKET_IMAGES: 'images' = 'images';
export const BUCKET_ALBUMS: 'albums' = 'albums';
export const BUCKET_USERS: 'users' = 'users';

export type BUCKET_TYPE = typeof BUCKET_ALBUMS
	| typeof BUCKET_IMAGES
	| typeof BUCKET_USERS;