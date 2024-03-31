"use client"

import { getUserById } from "@/lib/queries/user/get-user-by-id";
import { createClient } from "@/lib/utils/supabase/client";
import { UserAvatar } from "./personal/child/user-avatar";
import { useEffect, useState } from "react";
import { UserPlaylist } from "./personal/child/user-playlist";
import { UserGeneric } from "@/types/entities/user";
import { UserName } from "./personal/child/user-name";
import { ColoredBackground } from "@/ui/colored-background";
import { useLoadUserAvatar } from "@/lib/hooks/actions/user/preferences/use-load-user-avatar";
import { Typography } from "@/ui/typography";
import { Wrapper } from "@/ui/wrapper";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export const ProfileUserItem = ({
  userId,
  user
}: {
  userId: string,
  user: UserGeneric
}) => {
  const [currentUser, setCurrentUser] = useState(false);

  const { data: userById } = useQuery({
    queryKey: [userId],
    queryFn: async () => await getUserById(supabase, userId)
  })

  const { data: avatar } = useLoadUserAvatar(user?.id!)

  useEffect(() => {
    if (user?.id === userById?.data?.id) {
      setCurrentUser(true)
    } else {
      setCurrentUser(false)
    }
  }, [user, userById]);

  if (!userById?.data) return null;

  return (
    <Wrapper variant="page">
      <ColoredBackground imageUrl={avatar || '/images/null-avatar.png'} />
      <div className="flex relative items-start p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center relative overflow-hidden group rounded-full h-[248px] w-[248px]">
            <UserAvatar
              user={userById?.data}
              currentUser={currentUser}
            />
          </div>
          <div className="flex flex-col justify-between gap-y-4">
            <Typography className="text-white text-md font-medium">
              Профиль
            </Typography>
            <UserName
              user={userById?.data}
              variant="profile"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full bg-black/20 backdrop-filter backdrop-blur-md">
        {currentUser && (
          <UserPlaylist />
        )}
      </div>
    </Wrapper>
  )
}