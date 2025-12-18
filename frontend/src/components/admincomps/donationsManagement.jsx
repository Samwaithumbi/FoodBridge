import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import api from "../../apis/axios"
import ViewDonation from "./viewDonation";

const DonationManagement = ({ allDonations, setAllDonations, token, refreshDonations }) => {
  const [viewDonation, setViewDonation] = useState(false);
  const [donationDetails, setDonationDetails] = useState({});
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchDonations = async () => {
    try {
      const res = await api.get("/api/admin/donations", {
        params: { q: search, status },
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllDonations(res.data.donations);
    } catch (error) {
      console.log("Failed to fetch donations", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDonations();
    }, 100);

    return () => clearTimeout(delay);
  }, [search, status]);

  const handleViewDonation = async (id) => {
    try {
      const res = await api.get(`/api/admin/donations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setDonationDetails(res.data);
      setViewDonation(true); // open modal AFTER data loads
    } catch (error) {
      console.log("Failed to fetch donation info", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/admin/donations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (typeof refreshDonations === "function") await refreshDonations();
      setViewDonation(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow">
        <h1>Donation Management</h1>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search donations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Available">Available</option>
            <option value="Rejected">Rejected</option>
            <option value="Claimed">Claimed</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto sm:rounded-lg">
          <table className="min-w-max w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                <th className="p-3 border whitespace-nowrap">Donor</th>
                <th className="p-3 border whitespace-nowrap">Item Name</th>
                <th className="p-3 border whitespace-nowrap">Status</th>
                <th className="p-3 border whitespace-nowrap">Location</th>
                <th className="p-3 border whitespace-nowrap">Quantity</th>
                <th className="p-3 border whitespace-nowrap">Expiry</th>
                <th className="p-3 border whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {allDonations && allDonations.length > 0 ? (
                allDonations.map((donation) => (
                  <tr key={donation._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 border whitespace-nowrap">{donation.donor?.name || "unknown"}</td>
                    <td className="p-3 border whitespace-nowrap">{donation.title}</td>
                    <td className="p-3 border whitespace-nowrap">{donation.donationStatus}</td>
                    <td className="p-3 border whitespace-nowrap">{donation.location || "N/A"}</td>
                    <td className="p-3 border whitespace-nowrap">{donation.quantity || 0}</td>
                    <td className="p-3 border whitespace-nowrap">
                      {new Date(donation.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 border whitespace-nowrap">
                      <div className="flex gap-2 justify-center flex-shrink-0">
                        <button
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                          onClick={() => handleViewDonation(donation._id)}
                        >
                          <LuEye />
                        </button>
                        <button
                          onClick={() => handleDelete(donation._id)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No donations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Donation Modal */}
      {viewDonation && (
        <ViewDonation
          setViewDonation={setViewDonation}
          donationDetails={donationDetails}
          token={token}
          refreshDonations={refreshDonations}
        />
      )}
    </>
  );
};

export default DonationManagement;
