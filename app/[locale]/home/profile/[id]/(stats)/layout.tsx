import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProfileStatsLayout({
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