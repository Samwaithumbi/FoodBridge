import AvailableFood from "@/components/beneficiarydashcomps/availableFoods";
import Nav from "@/components/donationscomps/navbar";
import BeneficiaryStats from "@/components/beneficiarydashcomps/statsStatus";
import { useState } from "react";

const BeneficiaryDash  = () => {
   const [reqStatus, setReqStatus] = useState("")
    return ( 
        <>
            <main>
                <div>
                  <Nav />
                </div>
                <div className="mt-13">
                 <AvailableFood reqStatus={reqStatus} setReqStatus={setReqStatus} />
                 <BeneficiaryStats/>
                </div>
               
            </main>
      
        </>
     );
}
 
export default BeneficiaryDash ;