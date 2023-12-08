"use client"

import { useState, useEffect } from "react"
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useUser } from "@/hooks/use-user";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

interface LikeButtonProps {
  songId: string,
}

export const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
        
        toast.success("Удалено из любимых треков", {
          position: toast.POSITION.BOTTOM_CENTER,
          icon: ({theme, type}) =>  <img src="/images/liked.png"/>,
        });
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({
          song_id: songId,
          user_id: user.id
        });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);

        toast.success("Добавлено в любимые треки", {
          position: toast.POSITION.BOTTOM_CENTER,
          icon: ({theme, type}) =>  <img src="/images/liked.png"/>
        });
      }
    }

    router.refresh();
  }

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <Icon color={isLiked ? '#22c55e' : "white"} size={25} />
    </button>
  );
}