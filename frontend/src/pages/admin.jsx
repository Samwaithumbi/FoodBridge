import { useEffect, useState } from "react";
import Analytics from "@/components/admincomps/analytics";
import AdminUsersTable from "@/components/admincomps/userManagement";
import axios from "axios";
import DonationManagement from "@/components/admincomps/donationsManagement";
import RequestManagement from "@/components/admincomps/requestManagement";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [allDonations, setAllDonations] = useState([]);
  const [availableDonations, setAvailableDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjVhNjQxNmY4YjY2NzdjY2EyZjI2OSIsImlhdCI6MTc2NDA3NTEwOSwiZXhwIjoxNzY2NjY3MTA5fQ.xOBdRvTR4zPtzW7BxVE8lC2zNYhfbSYfMAFykI00AGU";

    useEffect(() => {
      async function fetchDetails() {
        try {
          const [usersRes, donationRes, availableDonationRes, requestsRes] =
            await Promise.all([
              axios.get("http://localhost:3000/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
              }),
              axios.get("http://localhost:3000/api/admin/donations", {
                headers: { Authorization: `Bearer ${token}` },
              }),
              axios.get("http://localhost:3000/api/donations/available", {
                headers: { Authorization: `Bearer ${token}` },
              }),
              axios.get("http://localhost:3000/api/requests/pending-requests", {
                headers: { Authorization: `Bearer ${token}` },
              }),
            ]);
    
          setUsers(usersRes.data.users);
          setAllDonations(donationRes.data.donations);
          setAvailableDonations(availableDonationRes.data.donations);
          setRequests(requestsRes.data);
          console.log(requestsRes.data);
        } catch (error) {
          console.error("Error fetching admin details:", error);
        }
      }
    
      fetchDetails();
    }, [token]);
    

  //refresh
  const fetchDonations = async () => {
    try {
      const donationRes = await axios.get(
        "http://localhost:3000/api/admin/donations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setAllDonations(donationRes.data.donations);
    } catch (error) {
      console.error("Error refreshing donations:", error);
    }
  };
  

  return (
   
      <>
      <div className="p-4 md:p-6">
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-600">
            Managing FoodBridge platform and users
          </p>
        </div>

        <Analytics
          users={users}
          allDonations={allDonations}
          availableDonations={availableDonations}
          requests={requests}
        />

        <div className="mt-8">
          
       <RequestManagement
          token={token}
          requests={requests}
       />

        <DonationManagement
          token={token}
          allDonations={allDonations}
          refreshDonations={fetchDonations}
        />

          <AdminUsersTable
            token={token}
            users={users}
            setUsers={setUsers}
          />
        </div>
      </div>
      </>
  );
};

export default Admin;
