"use client"

import { useSongWidget } from "@/lib/hooks/actions/song/widget/use-song-widget";
import { X } from "lucide-react";
import { useCallback } from "react";

export const ToggleWidgetButton = () => {
  const { handleToggleSongWidget } = useSongWidget()

  const toggleDisplay = useCallback(() => {
    handleToggleSongWidget();
  }, [handleToggleSongWidget]);

  return (
    <div
      onClick={toggleDisplay}
      className="relative cursor-pointer hover:bg-neutral-800 rounded-full opacity-70 p-2 transition hover:opacity-100 focus:outline-none 
    disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 
    dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400"
    >
      <X className="h-6 w-6" />
    </div>
  )
}