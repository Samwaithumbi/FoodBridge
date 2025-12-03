import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
 
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
    icon: Home,
  },
  {
    title: "Donation Management",
    icon: Inbox,
  },
  {
    title: "Request Management",
    icon: Calendar,
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
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
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
                        hover:shadow shadow-amber-200
                        ${activePage === item.title ? "bg-amber-200" : "bg-transparent"}
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
