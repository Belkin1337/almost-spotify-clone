export default async function ProfileEditArtistByIdPage({ 
  params 
}: { 
  params: { artistId: string }
}) {
  return (
    <>
      {params.artistId}
    </>
  )
}