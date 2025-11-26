import axios from "axios";
import { CiCalendarDate } from "react-icons/ci";
import { MdCancel, MdDelete, MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const ViewDonation = ({setViewDonation, donationDetails, token, refreshDonations}) => {

  // approing donation
  const handleApprove = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/admin/donations/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log(res.data);
      if (typeof refreshDonations === "function") {
        await refreshDonations();
      } else {
        console.warn("refreshDonations is not a function:", refreshDonations);
      }
     setViewDonation(false);
    } catch (error) {
      console.log(error);
    }
  };

  //rejecting donation
  const handleReject = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/admin/donations/${id}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log(res.data);
      if (typeof refreshDonations === "function") {
        await refreshDonations();
      } else {
        console.warn("refreshDonations is not a function:", refreshDonations);
      }
     setViewDonation(false);
    } catch (error) {
      console.log(error);
    }
  };
  
    return ( 
        <>
             <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[450px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">

            {/* Header */}
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold">Donation Details</h2>
                <p className="font-medium">View and Manage donaation Details</p>
              </div>
              <button 
               onClick={()=>setViewDonation(false)}
              >
                <MdCancel size={22} />
              </button>
            </div>

            {/* Profile */}
            <div className="flex gap-2 bg-gray-50 p-3 rounded-lg mb-4">
              <div>
                <h3 className="font-medium text-2xl">{donationDetails?.donor}</h3>
                <p>{donationDetails.title }</p>
              </div>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-2 gap-3">
              
              <div>
                <p className="text-lg text-gray-500">Description</p>
                <p className="flex items-center gap-1 font-semibold">{donationDetails.description}</p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Quantity</p>
                <p className="font-semibold">{donationDetails.quantity}</p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Location</p>
                <p className="flex items-center gap-1 font-semibold">{donationDetails.location}</p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Join Date</p>
                <p className="flex items-center gap-1 font-semibold">
                  <CiCalendarDate className="text-gray-500" />
                  {new Date(donationDetails.expiryDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Status</p>
                <p className="font-semibold">{donationDetails.donationStatus}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between gap-3 mt-6">
              <button
                onClick={() => {
                  handleDelete(donationDetails._id);
                 
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg flex gap-1 items-center"
              >
                <MdDelete size={18} />
              </button>

              <button
                onClick={() => handleReject(donationDetails._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg flex gap-1 items-center"
              >
                <MdCancel size={18} /> Reject
              </button>

              <button
              
                onClick={() => handleApprove(donationDetails._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg flex gap-1 items-center"
              >
                <TiTick size={18} /> Approve
              </button>
            </div>
          </div>
        </div>
        </>
     );
}
 
export default ViewDonation;