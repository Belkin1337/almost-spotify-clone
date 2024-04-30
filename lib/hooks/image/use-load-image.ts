"use client"

import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFileFromImages } from "@/lib/queries/files/single/get-file-from-images";
import { BUCKET_TYPE } from "@/lib/constants/files/buckets";
import { imageQueryKey } from "@/lib/querykeys/file";

const supabase = createClient();

type ResponseData = Blob | null | undefined;

export const useLoadImage = (
  image_path?: string,
  bucket: BUCKET_TYPE = "images"
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: imageQueryKey(bucket, image_path),
    queryFn: async () => {
      if (image_path) {
        const cachedData: ResponseData = queryClient.getQueryData(imageQueryKey(bucket, image_path));

        if (!cachedData) {
          const { data, error } = await getFileFromImages({
            client: supabase,
            bucket: bucket,
            image_path: image_path
          });

          if (error) throw error;

          const url = URL.createObjectURL(data)

          return { url }
        } else {
          const url = URL.createObjectURL(cachedData);

          return { url }
        }
      }
    },
    retry: 1,
    enabled: !!image_path,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  })
}