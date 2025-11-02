import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DonorWelcome from "@/components/donationscomps/donar-welcome"
import Stats from "@/components/donationscomps/stats"
import Donations from "@/components/donationscomps/donationLists"
import Nav from "@/components/donationscomps/navbar"

export default function Layout() {
  return (
    <SidebarProvider>
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <AppSidebar />
  
      {/* Main content */}
      <main className="flex-1 p-4">
        {/* Top navigation */}
        <div className="mt-0 bg-amber-50 flex justify-between items-center mb-6 fixed md:gap-[800px]">
          <SidebarTrigger />
          <Nav />
        </div>
  
        
        <section className="mb-6">
          <DonorWelcome />
        </section>
        <section className="mb-6">
          <Stats />
        </section>
        <section>
          <Donations />
        </section>
      </main>
    </div>
  </SidebarProvider>
  
  )
}