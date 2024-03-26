export const SongCard = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="flex w-[400px] h-[410px] overflow-hidden p-2 bg-neutral-800 border border-neutral-700">
      {children}
    </div>
  )
}