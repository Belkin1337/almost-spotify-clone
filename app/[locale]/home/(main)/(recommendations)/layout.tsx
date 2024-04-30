import { ReactNode } from "react";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomeMainRecommendatationsLayout({
	children
}: {
	children: ReactNode
}) {
	const supabase = createClient(cookies());
	const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) redirect('/home')

	return (
		<>
			{children}
		</>
	)
}