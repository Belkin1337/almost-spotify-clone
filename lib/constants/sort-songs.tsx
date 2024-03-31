import { 
  ORDER_TYPE_AT_FIRST,
  ORDER_TYPE_FROM_THE_END, 
  SONGS_TYPE_ALL, 
  SONGS_TYPE_BY_ARTIST, 
  VIEW_TYPE_COMPACT,
  VIEW_TYPE_GRID, 
  VIEW_TYPE_LIST 
} from "./ui"
import { FaList } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import { HiOutlineViewList } from "react-icons/hi";

export type ViewType = typeof VIEW_TYPE_COMPACT | typeof VIEW_TYPE_LIST | typeof VIEW_TYPE_GRID;
export type OrderType = typeof ORDER_TYPE_AT_FIRST | typeof ORDER_TYPE_FROM_THE_END;
export type SongsType = typeof SONGS_TYPE_ALL | typeof SONGS_TYPE_BY_ARTIST;

interface TypeList {
  name: string,
  type: string,
  icon: () => React.ReactNode;
}

type OrderTypeList = Omit<TypeList, 'icon'>;
type ViewTypeList = TypeList;
type SongsTypeList = Omit<TypeList, 'icon'>;

const songsTypeList: SongsTypeList[] = [
  {
    name: "Все треки",
    type: SONGS_TYPE_ALL
  },
  {
    name: "По артисту",
    type: SONGS_TYPE_BY_ARTIST
  }
]

const orderTypeList: OrderTypeList[] = [
  {
    name: "С новых",
    type: ORDER_TYPE_FROM_THE_END,
  },
  {
    name: "Со старых",
    type: ORDER_TYPE_AT_FIRST,
  }
]

const viewTypeList: ViewTypeList[] = [
  {
    name: "Компактный",
    type: VIEW_TYPE_COMPACT,
    icon: () => <HiOutlineViewList size={16} />
  },
  {
    name: "Список",
    type: VIEW_TYPE_LIST,
    icon: () => <FaList size={16} />
  },
  {
    name: "Сетка",
    type: VIEW_TYPE_GRID,
    icon: () => <FiGrid size={16} />
  },
]

export {
  orderTypeList,
  songsTypeList,
  viewTypeList
}