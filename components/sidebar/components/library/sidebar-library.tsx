import { SidebarLibraryList } from "@/components/sidebar/components/library/sidebar-library-list";
import { SidebarLibrarySort } from "@/components/sidebar/components/library/components/sidebar-library-sort";
import { SidebarLibrarySearch } from "@/components/sidebar/components/library/components/sidebar-library-search";
import { SidebarLibraryTitle } from "@/components/sidebar/components/library/components/sidebar-library-title";
import { SidebarLibraryTools } from "@/components/sidebar/components/library/sidebar-library-tools";

export const SidebarLibrary = () => {
	return (
		<>
			<div className="flex flex-col gap-y-4 items-start">
				<div className="flex items-center justify-between w-full gap-x-2 px-2">
					<SidebarLibraryTitle />
					<SidebarLibraryTools />
				</div>
				<SidebarLibrarySort/>
				<SidebarLibrarySearch/>
			</div>
			<SidebarLibraryList/>
		</>
	)
}