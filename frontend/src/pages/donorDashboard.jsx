import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DonorWelcome from "@/components/donationscomps/donar-welcome"
import Stats from "@/components/donationscomps/stats"
import Donations from "@/components/donationscomps/donationLists"
import Nav from "@/components/donationscomps/navbar"

export default function Layout() {

  const userData=JSON.parse(localStorage.getItem("userData"))
  return (
    <SidebarProvider>
    <div className="m-0 flex">
      <AppSidebar />
  
      {/* Main content */}
      <main className="flex-1 ">
        <div className=" p-2 gap-35 bg-amber-50 flex justify-between items-center  fixed md:gap-[800px]">
          <SidebarTrigger />
          <Nav name={userData.name} userId={userData.userId}/>
        </div>
  
        
        <section className="mb-6">
          <DonorWelcome name={userData.name} />
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