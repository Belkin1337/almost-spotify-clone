import { ReactNode } from "react";

export default function ArtistLayout({
	children,
	params,
}: {
	children: ReactNode
	params: {
		id: string
	}
}) {
	return <section>{children}</section>
}