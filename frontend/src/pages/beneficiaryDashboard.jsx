import AvailableFood from "@/components/beneficiarydashcomps/availableFoods";
import Nav from "@/components/donationscomps/navbar";
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
                 
                </div>
               
            </main>
      
        </>
     );
}
 
export default BeneficiaryDash ;