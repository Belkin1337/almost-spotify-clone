import { createClient } from "@/lib/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FaPlay } from "react-icons/fa";

export default async function HomeArtistPage({ params }: { params: { name: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/home')
  }

  return (
    <div className="relative -top-[84px] flex flex-col rounded-md h-full overflow-y-auto w-full bg-DARK_SECONDARY_BACKGROUND">
      <div className="overflow-hidden h-[524px] p-6 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url("/images/ob.jpg")` }}>
        <div className="relative z-20 flex flex-col justify-end h-full items-start">
          <p className="text-white font-bold text-6xl">
            {params.name}
          </p>
        </div>
      </div>
      <div className="h-full flex flex-col p-6">
        <button className="transition rounded-full w-[48px] h-[48px] items-center flex bg-jade-500 p-4 hover:scale-[1.12]">
          <FaPlay className="text-black" />
        </button>
      </div>
    </div>
  )
}