import { EditSongForm } from "@/components/forms/media/song/edit/edit-song"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { SongEntity } from "@/types/entities/song"
import { Button } from "@/ui/button"

export const SongEdit = ({
  song
}: {
  song: SongEntity
}) => {
  const { openDialog } = useDialog()

  return (
    <div className="flex items-start gap-2 justify-between">
      <Button
        variant="form"
        rounded="large"
        onClick={() => openDialog({
          dialogChildren: <EditSongForm song={song}/>
        })}
      >
        Редактировать
      </Button>
      <Button
        variant="form"
        rounded="large"
        className="text-red-500"
      >
        Удалить
      </Button>
    </div>
  )
}