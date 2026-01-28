import {  ClipboardList, Gift, Search, Settings,Users } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "User Management",
    icon: Users,
  },
  {
    title: "Donation Management",
    icon: Gift,
  },
  {
    title: "Request Management",
    icon: ClipboardList,
  },
  {
    title: "Profile",
    icon: Search,
  },
  {
    title: "Settings",
    icon: Settings,
  },
]
 
export function AppSidebar({activePage, setActivePage }) {
  return (
    <Sidebar >
      <SidebarContent className={`bg-slate-900 text-white`}>
        <SidebarGroup>
          <SidebarGroupLabel className={`text-2xl text-amber-50 underline mb-3`}>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => setActivePage(item.title)}
                  >
                    <button  className={`
                        flex items-center gap-2 w-full text-left
                        hover:shadow shadow-slate-800
                        ${activePage === item.title ? "bg-amber-700" : "bg-transparent"}
                      `}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
