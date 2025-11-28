import { useState } from "react";
import ViewRequest from "./viewRequest";
import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const RequestManagement = ({requests, token}) => {
    const [viewRequest, setViewRequest]=useState(false)
    const [requestDetails, setRequestDetails]=useState({})

    const handleViewRequest = async (id) => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/requests/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
       console.log(res.data);
        setRequestDetails(res.data);
        setViewRequest(true); // open modal AFTER data loads
      } catch (error) {
        console.log("Failed to fetch Request info", error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/requests/${id}/delete`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setViewRequest(false);
      } catch (err) {
        console.error("Delete failed", err);
      }
    };
    return ( 
        <>
           <div className="p-6 bg-white rounded-xl shadow">
        <h1>Requests Management</h1>

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search donations..."
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
        <div className="w-full overflow-x-auto">
          <table className="min-w-max w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                <th className="p-3 border">Requesst ID</th>
                <th className="p-3 border">Donor</th>
                <th className="p-3 border">Beneficiary</th>
                <th className="p-3 border">Food Item</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border text-center">Location</th>
                <th className="p-3 border text-center">Date</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {requests && requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">{request._id}</td>
                  <td className="p-3 border">{request.donor?.name}</td>
                  <td className="p-3 border">{request.beneficiary?.name}</td>
                  <td className="p-3 border">{request.donation?.title || "N/A"}</td>
                  <td className="p-3 border">{request.donation?.quantity || 0}</td>
                  <td className="p-3 border">{request.reqStatus}</td>
                  <td className="p-3 border">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                
                  <td className="p-3 border">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                        onClick={() => handleViewRequest(request._id)}
                      >
                        <LuEye />
                      </button>
                
                      <button
                        onClick={()=>handleDelete(request._id)}
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
      {viewRequest && (
       <ViewRequest
        setViewRequest={setViewRequest}
        requestDetails={requestDetails}
        token={token}
      />
     
      )}
        </>
     );
}
 
export default RequestManagement;