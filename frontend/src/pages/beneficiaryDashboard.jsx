import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AvailableFood from "@/components/beneficiarydashcomps/availableFoods";

const BeneficiaryDash  = () => {
    return ( 
        <>
         <SidebarProvider>
        
            <AppSidebar />
            <main>
            <SidebarTrigger />
            
            <AvailableFood/>
            </main>
        </SidebarProvider>
      
        </>
     );
}
 
export default BeneficiaryDash ;