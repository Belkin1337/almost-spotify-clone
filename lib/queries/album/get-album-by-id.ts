import { AlbumEntity } from "@/types/entities/album";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

export async function getAlbumById(client: SupabaseClient, albumId: string): Promise<AlbumEntity> {
  try {
    const { data, error }: PostgrestSingleResponse<AlbumEntity> = await client
      .from('albums')
      .select('*')
      .eq('id', albumId)
      .single();

    if (error) {
      throw error;
    }

    return data as AlbumEntity;
  } catch (error) {
    console.error("Произошла ошибка при получении альбома:", error);
    throw error;
  }
}