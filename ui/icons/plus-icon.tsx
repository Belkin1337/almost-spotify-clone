import { LuPlusCircle } from "react-icons/lu";
import { Plus } from "lucide-react"

type LuPlusIconVariantsType = {
	page?: boolean
}

const LuPlusIcon = ({
	page
}: LuPlusIconVariantsType) => {
	return (
		<LuPlusCircle
			className={page ? "text-neutral-400" : ''}
			size={page ? 44 : 22}
		/>
	)
}

const DefaultPlusIcon = () => {
	return (
		<Plus size={18} className="text-neutral-400"/>
	)
}

export { LuPlusIcon, DefaultPlusIcon }