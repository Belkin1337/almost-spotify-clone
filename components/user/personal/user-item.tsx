"use client"

import { UpdateAvatarForm } from "@/components/forms/update-avatar";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { getUserById } from "@/lib/queries/get-user-by-id";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { UserAvatar } from "./child/user-avatar";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useEffect, useState } from "react";
import { UserPersonalSection } from "./child/user-personal";
import { FaPen } from "react-icons/fa6";
import { UserGeneric } from "@/types/entities/user";

type ProfileUserItemGeneric = {
  userId: string
}

export const ProfileUserItem = ({ userId }: ProfileUserItemGeneric) => {
  const [currentUser, setCurrentUser] = useState(false);
  const { openDialog } = useDialog();
  const supabase = createClient();
  const { data: actualUser } = useUser();
  const { data: user } = useQuery<UserGeneric>(getUserById(supabase, userId))

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
  }, [actualUser, user])

  return (
    <div className="relative h-full flex flex-col rounded-md overflow-y-auto w-full bg-DARK_SECONDARY_BACKGROUND">
      <div className="bg-gradient-to-t from-violet-800/10 from-[10%] to-violet-600">
        <div className="flex h-[424px] items-start p-6">
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
            <div className="flex flex-col justify-between h-full gap-y-4">
              <p className="text-white text-md font-medium">
                Профиль
              </p>
              <p className="text-white text-6xl font-bold">
                {user?.first_name || ""} {user?.last_name || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      {currentUser && (
        <UserPersonalSection />
      )}
    </div>
  )
}