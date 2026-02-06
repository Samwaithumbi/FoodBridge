import { useEffect, useState } from "react"; 
import Analytics from "@/components/admincomps/analytics";
import AdminUsersTable from "@/components/admincomps/userManagement";
import DonationManagement from "@/components/admincomps/donationsManagement";
import RequestManagement from "@/components/admincomps/requestManagement";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import api from "@/apis/axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [allDonations, setAllDonations] = useState([]);
  const [availableDonations, setAvailableDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activePage, setActivePage] = useState("User Management");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchDetails() {
      try {
        const [availableDonationRes, requestsRes] = await Promise.all([
          api.get("/api/donations/available", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/api/requests/pending-requests", {
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
      const donationRes = await api.get("/api/admin/donations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllDonations(donationRes.data.donations);
    } catch (error) {
      console.error("Error refreshing donations:", error);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 md:fixed">
        <AppSidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 flex flex-col">
          <SidebarTrigger className="md:hidden p-2 m-2 bg-blue-500 text-white rounded-md" />

          <main className="p-4 md:p-8 w-full max-w-full overflow-hidden">
            <div className=" mb-10">
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-1">Admin Panel </h1>
              <p className="text-sm text-gray-500"> Manage users, donations, and requests on FoodBridge</p>

            </div>

            <div className="mb-8">
              <Analytics
                users={users}
                allDonations={allDonations}
                availableDonations={availableDonations}
                requests={requests}
              />
            </div>

            {activePage === "Dashboard" && (
              <div className="mb-8">
                <Analytics
                  users={users}
                  allDonations={allDonations}
                  availableDonations={availableDonations}
                  requests={requests}
                />
              </div>
            )}

            {activePage === "User Management" && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <AdminUsersTable token={token} users={users} setUsers={setUsers} />
              </div>
            )}

            {activePage === "Donation Management" && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <DonationManagement
                  token={token}
                  allDonations={allDonations}
                  setAllDonations={setAllDonations}
                  refreshDonations={fetchDonations}
                />
              </div>
            )}

            {activePage === "Request Management" && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <RequestManagement token={token} requests={requests} />
              </div>
            )}

            {activePage === "Profile" && (
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <p>Your profile features go here.</p>
              </div>
            )}

            {activePage === "Settings" && (
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <p>Settings panel coming soon.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
