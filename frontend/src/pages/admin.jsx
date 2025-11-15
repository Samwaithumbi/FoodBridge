import { useState } from "react";
import Analytics from "@/components/admincomps/analytics";
import AdminUsersTable from "../components/admincomps/userManagement"
import DonationManagement from "@/components/admincomps/donationsManagement";
const Admin = () => {
    const [users, setUsers]=useState([])
    const [allDonations, setAllDonations] = useState([])
    const [availableDonations, setAvailableDonations]= useState([])
    const [requests, setRequests]= useState([])
    return ( 
        <>
        <div className="m-2">
         <div>
            <h1>Admin Panel</h1>
            <p>Managing FoodBridge  platform and users</p>
         </div>
           <div>
            <Analytics users={users} setUsers={setUsers}
              allDonations={allDonations} setAllDonations={setAllDonations}
              availableDonations={availableDonations} setAvailableDonations={setAvailableDonations}
              requests={requests} setRequests={setRequests}
              />
              <AdminUsersTable users={users} setUsers={setUsers}/>
              <DonationManagement 
               requests={requests}
              />
           </div>
         </div>
        </>
     );
}
 
export default Admin;