import axios from "axios";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import ViewRequest from "./viewRequest";

const DonationManagement = ({ requests }) => {
  const [view, setView] = useState(false);
  const [enrichedRequests, setEnrichedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjQ2NjFmMDVjY2Y3MDFjYzVlMGZkMiIsImlhdCI6MTc2Mzk5MzExOSwiZXhwIjoxNzY2NTg1MTE5fQ.VtBdfkRtbzaz_8ZaSEoUkjNQZnsVYToego7vwxcKozY"

  useEffect(() => {
    if (!requests || requests.length === 0) return;

    async function enrichRequests() {
      try {
        const enriched = await Promise.all(
          requests.map(async (req) => {
            try {
              // 🔹 Get Donation
              const donationRes = await axios.get(
                `http://localhost:3000/api/donations/${req.donation}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );

              const donationData = donationRes.data?.donation || donationRes.data;

              // 🔹 Get Donor
              const donorRes = await axios.get(
                `http://localhost:3000/api/admin/users/${req.donor}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );

              const donorData = donorRes.data?.user || donorRes.data;

              // 🔹 Get Beneficiary
              const beneficiaryRes = await axios.get(
                `http://localhost:3000/api/admin/users/${req.beneficiary}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );

              const beneficiaryData =
                beneficiaryRes.data?.user || beneficiaryRes.data;

              return {
                ...req,
                donationDetails: donationData || {},
                donorDetails: donorData || {},
                beneficiaryDetails: beneficiaryData || {},
              };
            } catch (err) {
              console.log(`❌ Error enriching request ${req._id}:`, err.message);
              return {
                ...req,
                donationDetails: null,
                donorDetails: null,
                beneficiaryDetails: null,
              };
            }
          })
        );

        setEnrichedRequests(enriched);
      } catch (error) {
        console.log("❌ Error enriching requests:", error);
      }
    }

    enrichRequests();
  }, [requests]);

  // 🔹 Update Request Status
  const updateRequestStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/requests/update/${id}`,
        { reqStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Updated:", res.data);

      // Update UI instantly
      setEnrichedRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, reqStatus: status } : r
        )
      );
    } catch (error) {
      console.error("❌ Update failed:", error.message);
    }
  };

  return (
    <>
      <div className="p-3">
        <h2 className="text-lg font-bold mb-3">Donation Requests</h2>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th>Donation</th>
                <th>Donor</th>
                <th>Beneficiary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {enrichedRequests.map((req) => (
                <tr key={req._id} className="border-b">
                  <td>{req?.donationDetails?.title || "Unknown"}</td>
                  <td>{req?.donorDetails?.username || "Unknown"}</td>
                  <td>{req?.beneficiaryDetails?.username || "Unknown"}</td>
                  <td className="font-semibold">{req.reqStatus}</td>
                  <td className="flex gap-3 py-2">
                    <LuEye
                      size={22}
                      className="cursor-pointer text-blue-600"
                      onClick={() => {
                        setSelectedRequest(req);
                        setView(true);
                      }}
                    />

                    <TiTick
                      size={22}
                      className="text-green-600 cursor-pointer"
                      onClick={() => updateRequestStatus(req._id, "approved")}
                    />

                    <MdCancel
                      size={22}
                      className="text-red-600 cursor-pointer"
                      onClick={() => updateRequestStatus(req._id, "rejected")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {view && selectedRequest && (
          <ViewRequest
            request={selectedRequest}
            setView={setView}
          />
        )}
      </div>
    </>
  );
};

export default DonationManagement;
