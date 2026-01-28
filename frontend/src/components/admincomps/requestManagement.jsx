import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import ViewRequest from "./viewRequest";
import api from "../../apis/axios"

const RequestManagement = ({ requests, token }) => {
  const [viewRequest, setViewRequest] = useState(false);
  const [requestDetails, setRequestDetails] = useState({});

  const handleViewRequest = async (id) => {
    try {
      const res = await api.get(`/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequestDetails(res.data);
      setViewRequest(true);
    } catch (error) {
      console.log("Failed to fetch request info", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/requests/${id}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setViewRequest(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 bg-white rounded-xl shadow w-full overflow-x-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Requests Management</h1>

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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-2 border  hidden md:table-cell">Request ID</th>
                <th className="p-2 border">Donor</th>
                <th className="p-2 border">Beneficiary</th>
                <th className="p-2 border">Food Item</th>
                <th className="p-2 border  hidden md:table-cell">Quantity</th>
                <th className="p-2 border  hidden md:table-cell">Status</th>
                <th className="p-2 border  hidden md:table-cell">Location</th>
                <th className="p-2 border  hidden md:table-cell">Date</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {requests && requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request._id} className="border-b hover:bg-gray-50">
                    <td className="p-2 border break-words max-w-[100px]  hidden md:table-cell">{request._id}</td>
                    <td className="p-2 border">{request.donor?.name || "N/A"}</td>
                    <td className="p-2 border">{request.beneficiary?.name || "N/A"}</td>
                    <td className="p-2 border">{request.donation?.title || "N/A"}</td>
                    <td className="p-2 border  hidden md:table-cell">{request.donation?.quantity || 0}</td>
                    <td className="p-2 border  hidden md:table-cell">{request.reqStatus}</td>
                    <td className="p-2 border  hidden md:table-cell">{request.donation?.location || "N/A"}</td>
                    <td className="p-2 border  hidden md:table-cell">{new Date(request.createdAt).toLocaleDateString()}</td>
                    <td className="p-2 border">
                      <div className="flex gap-2 justify-center flex-wrap">
                        <button
                          className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                          onClick={() => handleViewRequest(request._id)}
                        >
                          <LuEye />
                        </button>
                        <button
                          className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                          onClick={() => handleDelete(request._id)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4 text-gray-500">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Request Modal */}
      {viewRequest && (
        <ViewRequest
          setViewRequest={setViewRequest}
          requestDetails={requestDetails}
          token={token}
        />
      )}
    </>
  );
};

export default RequestManagement;
