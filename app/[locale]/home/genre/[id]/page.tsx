// impl genre page 

export default async function GenrePage({
  params
}: {
  params: { id: string }
}) {
  return (
    <>
      {params.id}
    </>
  )
}