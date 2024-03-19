import { Typography } from "@/ui/typography"
import { WidgetPreview } from "@/ui/widget-preview"
import { AuthForm } from "../forms/auth"
import Link from "next/link"
import { useDialog } from "@/lib/hooks/ui/use-dialog"

export const WidgetList = () => {
  const { openDialog } = useDialog();

  return (
    <div className="flex flex-col gap-y-2">
      <WidgetPreview title="Начни наслаждаться музыкой прямо сейчас!">
        <Typography
          className="!font-bold !text-black"
          onClick={() => openDialog({
            title: "Войдите в аккаунт",
            dialogChildren: <AuthForm />
          })}
        >
          Слушать
        </Typography>
      </WidgetPreview>
      <WidgetPreview title="Кто написал это приложение?">
        <Link href="https://pureawake.ru" >
          <Typography className="!font-bold !text-black">
            Перейти на сайт
          </Typography>
        </Link>
      </WidgetPreview>
    </div>
  )
}