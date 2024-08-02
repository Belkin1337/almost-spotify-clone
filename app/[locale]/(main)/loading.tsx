import { PageLoader } from "@/ui/page-loader";

export default async function PageLoading() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<PageLoader/>
		</div>
	)
}