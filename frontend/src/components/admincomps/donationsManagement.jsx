import axios from "axios";
import { useEffect } from "react";

const DonationManagement = ({ requests }) => {
   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTg5MzRlZjMyNmI5NjBiYTg4MzBmYiIsImlhdCI6MTc2MzIxODI4NiwiZXhwIjoxNzY1ODEwMjg2fQ.ilTxHI8_FOBS-I3tGdkTJINuVPMsViQqXpbLUmRdMKI"

  useEffect(() => {
    if (!requests || requests.length === 0) return;

    async function fetchDonation(donationId) {
     
      try {
        console.log(donationId);
        const res = await axios.get(
          `http://localhost:3000/api/donations/${donationId}`, 
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        let donation =res.data.donation
      } catch (error) {
        console.log(error);
      }
    }

    fetchDonation(requests[0].donation);
  }, [requests]);


  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow">
        <h1>User Management</h1>

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
          <table className="min-w-max w-full border-collapse">
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
              {requests && requests.length > 0 ? (
                requests.map((request, id) => (
                  <tr key={id} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">{request._id}</td>
                    <td className="p-3 border">{request.donor}</td>
                    <td className="p-3 border">{request.beneficiary}</td>
                    <td className="p-3 border">{request.donation}</td>
                    <td className="p-3 border">{request.message}</td>
                    <td className="p-3 border">{request.status}</td>
                    <td className="p-3 border">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>

                    {/* Action buttons */}
                    <td className="p-3 border">
                      <div className="flex gap-2 justify-center">
                        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">View</button>
                        <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded">Edit</button>
                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">Delete</button>
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
    </>
  );
};

export default DonationManagement;
