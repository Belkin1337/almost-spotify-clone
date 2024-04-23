"use client"

import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useQuery } from "@tanstack/react-query";
import { getFileFromImages } from "@/lib/queries/files/single/get-file-from-images";
import { BUCKET_TYPE } from "@/lib/constants/files/buckets";
import { imageQueryKey } from "@/lib/querykeys/file";

const supabase = createClient();

export const useLoadImage = (
  image_path: string,
  bucket: BUCKET_TYPE = "images"
) => {
  return useQuery({
    queryKey: imageQueryKey(bucket, image_path),
    queryFn: async () => {
      const url = await getFileFromImages({
        client: supabase,
        bucket: bucket,
        image_path: image_path
      });

      return { url }
    },
    retry: 1,
    enabled: !!image_path,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}