import { useToast } from "@/lib/hooks/ui/use-toast"
import { getArtistById } from "@/lib/queries/artist/get-artist-by-id"
import { createArtistSchema } from "@/lib/schemas/media/create-artist"
import { createClient } from "@/lib/utils/supabase/client"
import { ArtistEntity } from "@/types/entities/artist"
import { Form, FormField } from "@/ui/form"
import { FormFieldItem } from "@/ui/form-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArtistFormFields } from "../fields"
import { useCallback } from "react"

const supabase = createClient();

type editSchema = z.infer<typeof createArtistSchema>

export const EditArtistForm = ({
  artistId
}: {
  artistId: string
}) => {
  const { toast } = useToast();

  const { data: artist } = useQuery<ArtistEntity>(getArtistById(supabase, artistId), {
    enabled: !!artistId
  });

  const form = useForm<editSchema>({
    resolver: zodResolver(createArtistSchema),
    defaultValues: {
      name: artist?.name,
      cover_image: artist?.cover_image_url,
      description: artist?.description,
      image: artist?.avatar_url
    }
  })

  const onSubmit = useCallback(async (values: editSchema) => {
    try {
      if (!values) return;


    } catch (e) {
      toast({
        title: String(e),
        variant: "red"
      })
    }
  }, [toast])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        {/* <ArtistFormFields 
          form={form}
        /> */}
      </form>
    </Form>
  )
}