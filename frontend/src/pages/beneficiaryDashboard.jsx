import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AvailableFood from "@/components/beneficiarydashcomps/availableFoods";
import Nav from "@/components/donationscomps/navbar";
import BeneficiaryStats from "@/components/beneficiarydashcomps/statsStatus";

const BeneficiaryDash  = () => {
   
    return ( 
        <>
         <SidebarProvider>
           <AppSidebar />
            <main>
               <div className="  p-2 gap-35 bg-amber-50 flex justify-between items-center  fixed md:gap-[800px]">
                 <SidebarTrigger />
                  <Nav />
                </div>
                <div className="mt-13">
                 <AvailableFood/>
                 <BeneficiaryStats/>
                </div>
               
            </main>
        </SidebarProvider>
      
        </>
     );
}
 
export default BeneficiaryDash ;