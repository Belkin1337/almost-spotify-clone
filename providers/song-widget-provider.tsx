"use client"

import { SongWidgetContext } from "@/lib/hooks/actions/song/use-song-widget";
import { useCallback, useState } from "react";

export const SongWidgetProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [isSongWidgetVisible, setIsSongWidgetVisible] = useState<boolean>(true);

  const handleToggleSongWidget = useCallback(() => {
    setIsSongWidgetVisible((prev) => !prev);
  }, [])

  return (
    <SongWidgetContext.Provider value={{
      isSongWidgetVisible,
      handleToggleSongWidget
    }}>
      {children}
    </SongWidgetContext.Provider>
  );
};