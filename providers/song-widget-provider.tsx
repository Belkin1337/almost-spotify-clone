"use client"

import { SongWidgetContext } from "@/lib/hooks/actions/song/use-song-widget";
import { useState } from "react";

export const SongWidgetProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [isSongWidgetVisible, setIsSongWidgetVisible] = useState<boolean>(true);

  const toggleSongWidget = () => {
    setIsSongWidgetVisible((prev) => !prev);
  };

  return (
    <SongWidgetContext.Provider value={{
      isSongWidgetVisible,
      toggleSongWidget
    }}>
      {children}
    </SongWidgetContext.Provider>
  );
};