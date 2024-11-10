import { ReactNode } from "react";
import { getUser } from "@/lib/helpers/get-user";

export default async function ProfileStatsLayout({
	children
}: { children: ReactNode }) {
	await getUser()

	return (
		<>
			{children}
		</>
	)
}