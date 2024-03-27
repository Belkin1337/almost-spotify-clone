import { useToast } from "@/lib/hooks/ui/use-toast"
import { getArtistById } from "@/lib/queries/get-artist-by-id"
import { createArtistSchema } from "@/lib/schemas/media/create-artist"
import { createClient } from "@/lib/utils/supabase/client"
import { ArtistEntity } from "@/types/entities/artist"
import { Form, FormField } from "@/ui/form"
import { FormFieldItem } from "@/ui/form-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

const supabase = createClient();

type editSchema = z.infer<typeof createArtistSchema>

export const EditArtistForm = (artistId: string) => {
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

  const onSubmit = async (values: editSchema) => {
    try {
      if (!values) return;


    } catch (e) {
      toast({
        title: String(e),
        variant: "red"
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        <div className="flex lg:flex-row flex-col gap-x-4 gap-y-6 items-center justify-stretch">
          <div className="flex flex-col gap-y-8 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormFieldItem 
                label="Имя артиста"
                input={{
                  placeholder: 'Имя',
                  name: "artist_name",
                  autoCorrect: 'false',
                }}
              />
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}