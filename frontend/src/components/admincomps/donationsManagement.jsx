import axios from "axios";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ViewRequest from "./viewRequest";

const DonationManagement = ({ requests }) => {
  const [view, setView]= useState(false)
  const [enrichedRequests, setEnrichedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTg5MzRlZjMyNmI5NjBiYTg4MzBmYiIsImlhdCI6MTc2MzIxODI4NiwiZXhwIjoxNzY1ODEwMjg2fQ.ilTxHI8_FOBS-I3tGdkTJINuVPMsViQqXpbLUmRdMKI";

  useEffect(() => {
    if (!requests || requests.length === 0) return;

    async function enrich() {
      const updated = await Promise.all(
        requests.map(async (req) => {
          try {
            const donationRes = await axios.get(
              `http://localhost:3000/api/donations/${req.donation}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const donationData =
              donationRes.data?.donation || donationRes.data || null;
            const donorRes = await axios.get(
              `http://localhost:3000/api/auth/users/${req.donor}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const donorData = donorRes.data?.user || donorRes.data || null;
            const beneficiaryRes = await axios.get(
              `http://localhost:3000/api/auth/users/${req.beneficiary}`,
            );
            

            const beneficiaryData =
              beneficiaryRes.data?.user || beneficiaryRes.data || null;

            return {
              ...req,
              donationDetails: donationData,
              donorDetails: donorData,
              beneficiaryDetails: beneficiaryData,
            };
          } catch (err) {
            console.log("Error enriching request:", err);
            return req; 
          }
        })
      );

      setEnrichedRequests(updated);
    }

    enrich();
  }, [requests]);

  const updateRequestStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/requests/update/${id}`,
        { reqStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Updated:", res.data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  

  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow">
        <h1>Donation Management</h1>

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search requests..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
          />

          <select className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-40">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Donor</option>
            <option>Recipient</option>
          </select>
        </div>

        {/* Responsive Scroll */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[1200px] w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                <th className="p-3 border">Id</th>
                <th className="p-3 border">Donor</th>
                <th className="p-3 border">Beneficiary</th>
                <th className="p-3 border">Donation</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {enrichedRequests.length > 0 ? (
                enrichedRequests.map((request, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">{request._id}</td>

                    <td className="p-3 border">
                      {request.donorDetails?.name || "Unknown Donor"}
                    </td>

                    <td className="p-3 border">
                      {request.beneficiaryDetails?.name ||
                        "Unknown Beneficiary"}
                    </td>

                    <td className="p-3 border">
                      {request.donationDetails?.title || "Unknown Donation"}
                    </td>

                    <td className="p-3 border">
                      {request.message || "No message"}
                    </td>

                    <td className="p-3 border">{request.reqStatus}</td>

                    <td className="p-3 border">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 border">
                      <div className="flex gap-2 justify-center">
                        <button
                         onClick={()=>{
                          setView(true)
                          setSelectedRequest(request)
                         }}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                         <LuEye/>
                        </button>
                        <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded">
                          <TiTick/>
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                          <MdCancel/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {view && selectedRequest && (
        <ViewRequest 
        selectedRequest={selectedRequest} 
        setView={setView} 
        updateRequestStatus={updateRequestStatus}/>
       )}

    </>
  );
};

export default DonationManagement;
