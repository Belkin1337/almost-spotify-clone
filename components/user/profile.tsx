"use client"

import { UpdateAvatarForm } from "@/components/forms/user/update-avatar";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { getUserById } from "@/lib/queries/get-user-by-id";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { UserAvatar } from "./personal/child/user-avatar";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useEffect, useState } from "react";
import { UserPlaylist } from "./personal/child/user-playlist";
import { FaPen } from "react-icons/fa6";
import { UserGeneric } from "@/types/entities/user";
import { UserName } from "./personal/child/user-name";
import { Wrapper } from "@/ui/wrapper";
import { ColoredBackground } from "@/ui/colored-background";
import { useLoadUserAvatar } from "@/lib/hooks/actions/user/preferences/use-load-user-avatar";

const supabase = createClient();

export const ProfileUserItem = ({ 
  userId 
}: { 
  userId: string 
}) => {
  const [currentUser, setCurrentUser] = useState(false);
  const { openDialog } = useDialog();

  const { data: user } = useQuery<UserGeneric>(getUserById(supabase, userId))
  const { data: actualUser } = useUser();
  const { data: avatar } = useLoadUserAvatar(user?.id!)

  const updateAvatar = () => {
    openDialog({
      dialogChildren: <UpdateAvatarForm />
    })
  }

  useEffect(() => {
    if (actualUser?.id === user?.id) {
      setCurrentUser(true)
    } else {
      setCurrentUser(false)
    }
  }, [actualUser, user]);

  return (
    <Wrapper variant="page">
      <ColoredBackground imageUrl={avatar || '/images/null-avatar.png'} />
      <div className="flex relative items-start p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center relative overflow-hidden group rounded-full h-[248px] w-[248px]">
            <UserAvatar user={user!} />
            {currentUser && (
              <div onClick={updateAvatar} className="group-hover:flex flex-col gap-y-4 cursor-pointer items-center 
                justify-center hidden w-full top-0 bg-black/60 right-0 left-0 bottom-0 absolute h-full">
                <FaPen size={46} />
                <p className="text-white font-semibold">
                  Выбрать фото
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between gap-y-4">
            <p className="text-white text-md font-medium">
              Профиль
            </p>
            <UserName
              user={user as UserGeneric}
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