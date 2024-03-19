import { UserGeneric } from "@/types/entities/user"
import { Typography } from "@/ui/typography"
import { VariantProps, cva } from "class-variance-authority"

const userNameVariants = cva("text-white", {
  variants: {
    variant: {
      profile: "text-6xl font-bold",
      playlist: "text-sm font-medium"
    }
  },
  defaultVariants: {
    variant: "playlist"
  }
})

interface UserNameProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof userNameVariants> {
  user: UserGeneric
}

export const UserName = ({
  user,
  variant,
  className
}: UserNameProps) => {
  return (
    <Typography className={userNameVariants(({
      variant,
      className
    }))}
    >
      {user?.first_name || ""} {user?.last_name || ""}
    </Typography>
  )
}