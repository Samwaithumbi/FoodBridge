import { useEffect, useState } from "react";
import Analytics from "@/components/admincomps/analytics";
import AdminUsersTable from "../components/admincomps/userManagement"
import axios from "axios";

const Admin = () => {
    const [users, setUsers]=useState([])
    const [allDonations, setAllDonations] = useState([])
    const [availableDonations, setAvailableDonations]= useState([])
    const [requests, setRequests]= useState([])
    const [adminNav, setAdminNav] = useState("")
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjVhNjQxNmY4YjY2NzdjY2EyZjI2OSIsImlhdCI6MTc2NDA3NTEwOSwiZXhwIjoxNzY2NjY3MTA5fQ.xOBdRvTR4zPtzW7BxVE8lC2zNYhfbSYfMAFykI00AGU"

    useEffect(()=>{
       async function fetchDetails(){
         try {
            const usersRes =await axios.get('http://localhost:3000/api/admin/users', {
               headers:{Authorization:`Bearer ${token}`}
            })
            const donationRes =await axios.get('http://localhost:3000/api/admin/donations', {
               headers:{Authorization:`Bearer ${token}`}
            })
            const AvailableDonationRes =await axios.get('http://localhost:3000/api/donations/available', {
               headers:{Authorization:`Bearer ${token}`}
            })
            const requestsRes =await axios.get('http://localhost:3000/api/requests/pending-requests', {
               headers:{Authorization:`Bearer ${token}`}
            })
            setUsers(usersRes.data.users);
            setAllDonations(donationRes.data.donations);
            setAvailableDonations(AvailableDonationRes.data.donations);
            setRequests(requestsRes.data);
         } catch (error) {
            console.log(error);
         }
       }
       fetchDetails()
    }, [token])
    return ( 
        <>
        <div className="m-2">
         <div>
            <h1>Admin Panel</h1>
            <p>Managing FoodBridge  platform and users</p>
         </div>
           <div>
            <Analytics users={users} allDonations={allDonations} availableDonations={availableDonations} requests={requests}/>
     
             <AdminUsersTable adminNav={adminNav} token={token} setAdminNav={setAdminNav} users={users} setUsers={setUsers}/>
           </div>
         </div>
        </>
     );
}
 
export default Admin;