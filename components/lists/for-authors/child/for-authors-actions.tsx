"use client"

import { for_authors_route, profile_route } from "@/lib/constants/routes"
import { useUser } from "@/lib/hooks/actions/user/auth/use-user"
import { Typography } from "@/ui/typography";
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge";

interface AuthorsModule 
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ForAuthorsModule = ({
  children,
  className,
  ...props
}: AuthorsModule) => {
  return (
    <div {...props} className={
      twMerge(`flex items-center hover:bg-neutral-700 cursor-pointer 
      justify-center w-full 
      bg-neutral-800 border border-neutral-700 rounded-lg`,
        className)}>
      {children}
    </div>
  )
}

export const ForAuthorsActions = () => {
  const { push } = useRouter();
  const { user } = useUser();

  if (!user) return null;

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <Typography className="text-md font-medium !text-neutral-400">
          Моя авторская медиатека
        </Typography>
        <div className="flex items-center gap-4">
          <ForAuthorsModule
            onClick={() => push(`${profile_route}/${user?.id}/tracks`)}
            className="h-[80px]">
            <Typography className="text-3xl font-bold">
              Треки
            </Typography>
          </ForAuthorsModule>
          <ForAuthorsModule 
          onClick={() => push(`${profile_route}/${user.id}/albums`)}
          className="h-[80px]">
            <Typography className="text-3xl font-bold">
              Альбомы
            </Typography>
          </ForAuthorsModule>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <Typography className="text-md font-medium !text-neutral-400">
          Действия
        </Typography>
        <ForAuthorsModule 
        onClick={() => push(`${for_authors_route}/create-song`)}
        className="h-[120px]">
          <Typography className="text-3xl font-bold">
            Загрузить трек
          </Typography>
        </ForAuthorsModule>
        <ForAuthorsModule 
        onClick={() => push(`${for_authors_route}/create-album`)}
        className="h-[120px]">
          <Typography className="text-3xl font-bold">
            Создать альбом
          </Typography>
        </ForAuthorsModule>
      </div>
    </>
  )
}