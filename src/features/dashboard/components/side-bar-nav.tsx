import {
  CalendarIcon,
  GridIcon,
  DotIcon,
  FigmaLogoIcon,
  HomeIcon,
  KeyboardIcon,
} from "@radix-ui/react-icons";
import AnimalsList from "./animals-list";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, count: "5", current: true },
  { name: "Team", href: "#", icon: DotIcon, current: false },
  { name: "Projects", href: "#", icon: GridIcon, count: "12", current: false },
  {
    name: "Calendar",
    href: "#",
    icon: CalendarIcon,
    count: "20+",
    current: false,
  },
  { name: "Documents", href: "#", icon: FigmaLogoIcon, current: false },
  { name: "Reports", href: "#", icon: KeyboardIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

export default function SideBarNav() {
  return (
    <div className="absolute flex grow flex-col gap-y-5 overflow-y-auto h-screen px-6 pb-12">
      <nav className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-y-7 justify-end h-full">
          <AnimalsList />
        </div>
      </nav>
    </div>
  );
}
