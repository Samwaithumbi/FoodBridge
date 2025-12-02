import { useEffect, useState } from "react"; 
import Analytics from "@/components/admincomps/analytics";
import AdminUsersTable from "@/components/admincomps/userManagement";
import axios from "axios";
import DonationManagement from "@/components/admincomps/donationsManagement";
import RequestManagement from "@/components/admincomps/requestManagement";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
        const [availableDonationRes, requestsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/donations/available", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/requests/pending-requests", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setAvailableDonations(availableDonationRes.data.donations);
        setRequests(requestsRes.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    }

    fetchDetails();
  }, [token]);

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
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <SidebarTrigger className="md:hidden p-2 m-2 bg-blue-500 text-white rounded-md" />

          <main className="p-4 md:p-8 w-full">
            {/* Header */}
            <div className="mb-6 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Panel</h1>
              <p className="text-gray-600">Managing FoodBridge platform and users</p>
            </div>

            {/* Analytics */}
            <div className="mb-8">
              <Analytics
                users={users}
                allDonations={allDonations}
                availableDonations={availableDonations}
                requests={requests}
              />
            </div>

            {/* Management Sections */}
            <div className="space-y-8">
              {/* Requests */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <RequestManagement token={token} requests={requests} />
              </div>

              {/* Donations */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <DonationManagement
                  token={token}
                  allDonations={allDonations}
                  setAllDonations={setAllDonations}
                  refreshDonations={fetchDonations}
                />
              </div>

              {/* Users */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <AdminUsersTable
                  token={token}
                  users={users}
                  setUsers={setUsers}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
