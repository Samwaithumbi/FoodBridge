import axios from "axios";
import { CiCalendarDate } from "react-icons/ci";
import { MdCancel, MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const ViewDonation = ({
  setViewDonation,
  donationDetails,
  token,
  refreshDonations,
}) => {
  const donation = donationDetails?.donation;

  if (!donation) return null;

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleApprove = async () => {
    await axios.patch(
      `http://localhost:3000/api/admin/donations/${donation._id}/approve`,
      {},
      authHeader
    );
    await refreshDonations?.();
    setViewDonation(false);
  };

  const handleReject = async () => {
    await axios.patch(
      `http://localhost:3000/api/admin/donations/${donation._id}/reject`,
      {},
      authHeader
    );
    await refreshDonations?.();
    setViewDonation(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this donation?")) return;

    await axios.delete(
      `http://localhost:3000/api/admin/donations/${donation._id}`,
      authHeader
    );
    await refreshDonations?.();
    setViewDonation(false);
  };

  const statusColor = {
    Available: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
    Claimed: "bg-blue-100 text-blue-700",
    Expired: "bg-gray-100 text-gray-600",
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={() => setViewDonation(false)}
    >
      <div
        className="w-[480px] bg-white rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Donation Details</h2>
            <span
              className={`inline-block mt-1 px-2 py-1 rounded text-sm ${statusColor[donation.donationStatus]}`}
            >
              {donation.donationStatus}
            </span>
          </div>
          <button onClick={() => setViewDonation(false)}>
            <MdCancel size={22} />
          </button>
        </div>

        {/* Image */}
        {donation.image && (
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        {/* Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Donor</p>
            <p className="font-semibold">{donation.donor?.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Quantity</p>
            <p className="font-semibold">{donation.quantity}</p>
          </div>

          <div>
            <p className="text-gray-500">Location</p>
            <p className="font-semibold">{donation.location}</p>
          </div>

          <div>
            <p className="text-gray-500">Expiry Date</p>
            <p className="flex items-center gap-1 font-semibold">
              <CiCalendarDate />
              {new Date(donation.expiryDate).toLocaleDateString()}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500">Description</p>
            <p className="font-semibold">{donation.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2 mt-6">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            <MdDelete />
          </button>

          {donation.donationStatus === "Pending" && (
            <>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
              >
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
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

export default ViewDonation;
