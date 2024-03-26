import { createClient } from "@/lib/utils/supabase/client";
import { AlbumEntity } from "@/types/entities/album";
import { useMutation } from "@tanstack/react-query";
import uniqid from "uniqid";
import { useUser } from "../user/auth/use-user";
import { toast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";

type AlbumAttributes = {
  title: string;
  artist: string;
  genre: string;
  image_url: any;
  songs: Array<string>;
};

const supabase = createClient();
const uniqueID = uniqid();

export function useCreateAlbum() {
  const { refresh } = useRouter();
  const { user } = useUser();

  const uploadAlbumImage = useMutation({
    mutationFn: async (values: AlbumAttributes) => {
      try {
        const { data: imageData, error } = await supabase.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, values.image_url, {
            upsert: true,
            contentType: "fileBody",
          });

        if (error) {
          console.log(
            "Произошла ошибка загрузкии изображения альбома",
            imageData,
            error
          );
        }

        return imageData;
      } catch (e) {
        console.log(e);
      }
    },
  });

  const createAlbum = useMutation({
    mutationFn: async (values: AlbumAttributes) => {
      try {
        const [imageData] = await Promise.all([
          uploadAlbumImage.mutateAsync(values)
        ])

        if (!values) return;

        const { error } = await supabase.from("albums").insert({
          user_id: user?.id,
          title: values.title,
          artist: values.artist,
          image_url: imageData?.path,
          songs: values.songs || [],
        });

        if (error) {
          toast({
            title: String(error),
            variant: "red",
          });
        } else {
          toast({
            title: "Альбом создан успешно",
            variant: "right",
          });

          refresh();
        }
      } catch (e) {
        toast({
          title: String(e),
        });

        console.log(e);
      }
    },
  });

  return {
    createAlbum,
  };
}
