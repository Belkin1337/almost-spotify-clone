import { useState } from "react";

type PreviewAlbumType = {
  title?: string,
  author?: string,
  album?: string,
  genre?: string,
  image?: string
}

export const CreateAlbumForm = () => {
  const [preview, setPreview] = useState<PreviewAlbumType>({
    title: '',
    author: '',
    album: '',
    genre: '',
    image: ''
  });

  return (
    <>
      
    </>
  )
}