import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

const ViewRequest = ({ setView, selectedRequest, updateRequestStatus }) => {
    const handleApprove = () => {
        updateRequestStatus(selectedRequest._id, "approved");
        setView(false);
    };
    
    const handleReject = () => {
        updateRequestStatus(selectedRequest._id, "rejected");
        setView(false);
    };
    
  
    const handleDelete = () => {
      // if you want delete, tell me — I will add it  
    };
  
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-[450px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
  
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Donation Details</h2>
            <button onClick={() => setView(false)}><MdCancel size={22} /></button>
          </div>
  
          {/* ID + Status */}
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700">{selectedRequest._id}</h3>
  
            <span className={`px-3 py-1 text-xs rounded-full 
              ${selectedRequest.reqStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                selectedRequest.reqStatus === "approved" ? "bg-green-100 text-green-700" :
                "bg-red-100 text-red-700"}`}>
              {selectedRequest.reqStatus}
            </span>
          </div>
  
          {/* Details */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">Donor</p>
              <h3 className="font-medium">{selectedRequest.donorDetails?.name}</h3>
            </div>
  
            <div>
              <p className="text-xs text-gray-500">Beneficiary</p>
              <h3 className="font-medium">{selectedRequest.beneficiaryDetails?.name}</h3>
            </div>
  
            <div>
              <p className="text-xs text-gray-500">Food Item</p>
              <h3 className="font-medium">{selectedRequest.donationDetails?.title}</h3>
            </div>
          </div>
  
          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-500 text-white rounded-lg flex gap-1 items-center"
            >
              <MdCancel size={18} /> Reject
            </button>
  
            <button
              onClick={() => setView(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg flex gap-1 items-center"
            >
              Close
            </button>
  
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-green-600 text-white rounded-lg flex gap-1 items-center"
            >
              <TiTick size={18} /> Approve
            </button>
          </div>
  
        </div>
      </div>
    );
  }
  
  export default ViewRequest;