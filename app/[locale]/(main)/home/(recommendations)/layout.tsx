import { ReactNode } from "react";
import { getUser } from "@/lib/helpers/get-user";

export default async function HomeMainRecommendatationsLayout({
	children
}: {
	children: ReactNode
}) {
	await getUser({ withValidation: false })

	return (
		<>
			{children}
		</>
	)
}