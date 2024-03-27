"use client"

import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../ui/use-toast";
import { useUser } from "../user/auth/use-user"

export type FollowedArtist = {
  user_id: string,
  artist_id: string,
}

export function useFollowArtist(artistId: string) {
  const { user } = useUser();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  //...
}