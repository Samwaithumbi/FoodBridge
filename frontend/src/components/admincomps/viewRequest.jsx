import api from "../../apis/axios"; // centralized axios instance
import { CiCalendarDate } from "react-icons/ci";
import { MdCancel, MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import { toast } from "react-toastify";

const ViewRequest = ({ setViewRequest, requestDetails, token, refreshRequests }) => {
  if (!requestDetails) return null;

  const [loading, setLoading] = useState(false);
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const handleAction = async (action) => {
    try {
      setLoading(true);
      if (action === "approve") {
        const res = await api.patch(`/api/requests/${requestDetails._id}/approve`, {}, authHeader);
        toast.success(res.data.message);
      } else if (action === "reject") {
        const res = await api.patch(`/api/requests/${requestDetails._id}/reject`, {}, authHeader);
        toast.info(res.data.message);
      } else if (action === "delete") {
        if (!confirm("Are you sure you want to delete this request?")) return;
        await api.delete(`/api/requests/${requestDetails._id}`, authHeader);
        toast.success("Request deleted");
      }

      await refreshRequests?.();
      setViewRequest(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={() => setViewRequest(false)}
    >
      <div className="w-[480px] bg-white rounded-2xl shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Request Details</h2>
            <span className={`inline-block mt-1 px-2 py-1 rounded text-sm ${statusColor[requestDetails.reqStatus]}`}>
              {requestDetails.reqStatus}
            </span>
          </div>
          <button onClick={() => setViewRequest(false)}>
            <MdCancel size={22} />
          </button>
        </div>

        {/* Request ID */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-500">Request ID</p>
          <p className="font-semibold">{requestDetails._id}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Donor</p>
            <p className="font-semibold">{requestDetails.donor?.name || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Beneficiary</p>
            <p className="font-semibold">{requestDetails.beneficiary?.name || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Food Item</p>
            <p className="font-semibold">{requestDetails.donation?.title || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Location</p>
            <p className="font-semibold">{requestDetails.donation?.location || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Request Date</p>
            <p className="flex items-center gap-1 font-semibold">
              <CiCalendarDate />
              {new Date(requestDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2 mt-6">
          <button
            disabled={loading}
            onClick={() => handleAction("delete")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            <MdDelete />
          </button>

          {requestDetails.reqStatus === "Pending" && (
            <>
              <button
                disabled={loading}
                onClick={() => handleAction("reject")}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
              >
                Reject
              </button>
              <button
                disabled={loading}
                onClick={() => handleAction("approve")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-1"
              >
                <TiTick /> Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
