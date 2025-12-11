import axios from "axios";
import { CiCalendarDate } from "react-icons/ci";
import { MdCancel, MdDelete, MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";

const ViewRequest = ({setViewRequest, requestDetails, token}) => {

  // approing donation
  const handleApprove = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/requests/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      refreshRequests?.();
      setViewRequest(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  
  const handleReject = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/requests/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      refreshRequests?.();
      setViewRequest(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  
  
    return ( 
        <>
             <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[450px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">

            {/* Header */}
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold">Requests Details</h2>
                <p className="font-medium">View and Manage donaation Details</p>
              </div>
              <button 
               onClick={()=>setViewRequest(false)}
              >
                <MdCancel size={22} />
              </button>
            </div>

            {/* Profile */}
            <div className="flex gap-2 bg-gray-50 p-3 rounded-lg mb-4">
              <div>
                <p>Request ID</p>
                <p className="font-medium text-2xl">{requestDetails?._id}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-2 gap-3">
              
              <div>
                <p className="text-lg text-gray-500">Donor</p>
                <p className="flex items-center gap-1 font-semibold">{requestDetails?.donor?.name}</p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Beneficiary</p>
                <p className="font-semibold">{requestDetails?.beneficiary?.name}</p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Food Item</p>
                <p className="flex items-center gap-1 font-semibold">{requestDetails?.donation?.title}</p>
              </div>
              <div>
                <p className="text-lg text-gray-500">Location</p>
                <p className="flex items-center gap-1 font-semibold">{requestDetails?.donation?.location}</p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Join Date</p>
                <p className="flex items-center gap-1 font-semibold">
                  <CiCalendarDate className="text-gray-500" />
                  {new Date(requestDetails.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Status</p>
                <p className="font-semibold">{requestDetails.reqStatus}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between gap-3 mt-6">
              <button
                onClick={() => {
                  handleDelete(requestDetails._id);
                 
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg flex gap-1 items-center"
              >
                <MdDelete size={18} />
              </button>

              <button
                onClick={() => {
                  handleReject(requestDetails._id); 
                  setViewRequest(false)}}
                className="px-4 py-2 bg-green-600 text-white rounded-lg flex gap-1 items-center"
              >
                <MdCancel size={18} /> Reject
              </button>

              <button
              
                onClick={() => handleApprove(requestDetails._id)}
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
 
export default ViewRequest;