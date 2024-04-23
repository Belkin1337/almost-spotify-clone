import { useToast } from "@/lib/hooks/ui/use-toast"
import { createArtistSchema } from "@/components/forms/artist/schemas/schema-artist"
import { ArtistEntity } from "@/types/artist"
import { Form } from "@/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {useCallback, useEffect, useRef} from "react"
import {ArtistFormFields} from "@/components/forms/artist/components/fields";
import {useEditArtist} from "@/components/forms/artist/hooks/use-edit-artist";
import Link from "next/link";
import {artist_route_profile} from "@/lib/constants/routes/routes";
import {Typography} from "@/ui/typography";

type editSchema = z.infer<typeof createArtistSchema>

export const EditArtistForm = ({
  artist
}: {
  artist: ArtistEntity
}) => {
  const { toast } = useToast();
  const { editArtist } = useEditArtist();

  const imageRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  const form = useForm<editSchema>({
    resolver: zodResolver(createArtistSchema),
    defaultValues: {
      name: artist?.name,
      cover_image: undefined,
      description: artist?.description,
      avatar: undefined
    }
  })

  const onSubmit = useCallback(async (values: editSchema) => {
    try {
      if (!values || !imageRef.current || !coverImageRef.current) return;

      const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;
      const coverImageFile = coverImageRef.current.files ? coverImageRef.current.files[0] : null;

      if (imageFile && values) {
        await editArtist.mutateAsync({
          id: artist.id,
          name: values.name,
          avatar: imageFile,
          description: values.description,
          cover_image: coverImageFile || undefined
        })
      } else {
        toast({
          title: "Что-то пошло не так",
          variant: "red"
        })

        return;
      }
    } catch (e) {
      toast({
        title: String(e),
        variant: "red"
      })

      throw e;
    }
  }, [toast, artist.id, editArtist])

  useEffect(() => {
    if (editArtist.isSuccess && editArtist.data) {
      form.reset();

      toast({
        title: "Данные артиста изменены",
        description: (
          <Link href={`${artist_route_profile}/${artist?.id}`}>
            <Typography className="underline" text_color="black" font="bold">
              Перейти к артисту
            </Typography>
          </Link>
        ),
        variant: "right"
      })
    } else if (editArtist.isError) {
      toast({
        title: "Ошибка изменения артиста. Повторите попытку позже!",
        variant: "red"
      })
    }
  }, [editArtist.isSuccess, form, toast, artist.id, editArtist.data, editArtist.isError]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 p-6 min-w-[1200px]"
      >
        <ArtistFormFields
          form={form}
          type="edit"
          artist={artist!}
          isLoading={editArtist.isPending}
          refs={{
            imageRef: imageRef,
            imageCoverRef: coverImageRef
          }}
        />
      </form>
    </Form>
  )
}