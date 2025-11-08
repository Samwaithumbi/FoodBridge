import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DonorWelcome from "@/components/donationscomps/donar-welcome"
import Stats from "@/components/donationscomps/stats"
import Donations from "@/components/donationscomps/donationLists"
import Nav from "@/components/donationscomps/navbar"
import { useState } from "react"

export default function Layout() {
  const [donations, setDonations]=useState({
    title: "",
    description: "",
    image: "",
    location: "",
    expiryDate: "",
  })

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
  
        
        <section className="mt-13">
          <DonorWelcome  donations={donations} setDonations={setDonations} name={userData.name} />
        </section>
        <section className="mb-6">
          <Stats />
        </section>
        <section>
          <Donations donations={donations} setDonations={setDonations}/>
        </section>
      </main>
    </div>
  </SidebarProvider>
  
  )
}