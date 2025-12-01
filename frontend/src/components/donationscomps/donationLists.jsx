import axios from "axios";
import { useEffect, useState } from "react";

const Donations = ({ donations, setDonations }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/donations/my-donations",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDonations(res.data.donations || res.data); // adjust depending on API response
      } catch (err) {
        console.log("Error fetching donations:", err);
        setError("Failed to load donations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/donations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading donations...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );

  if (!donations || donations.length === 0)
    return (
      <p className="text-center mt-10 text-gray-400 italic">
        No donations available yet.
      </p>
    );

  // Helper for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Available":
        return "bg-green-100 text-green-800";
      case "Claimed":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Expired":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="m-4 max-w-7xl ml-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">My Donations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow bg-white p-4"
          >
            <img
              src={donation.image || "/hero.png"}
              alt={donation.title}
              className="w-full sm:w-[120px] h-[120px] object-cover rounded-md mb-3 sm:mb-0 sm:mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {donation.title}
              </h2>
              <p className="text-gray-600 text-sm my-1">{donation.description}</p>
              <p className="text-sm text-gray-700 font-medium">
                Quantity: {donation.quantity} Kg
              </p>
              <p className="text-gray-500 text-sm italic">{donation.location}</p>
              <p className="text-xs text-gray-400 mt-1">
                Posted on {new Date(donation.createdAt).toLocaleDateString()}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  donation.donationStatus
                )}`}
              >
                {donation.donationStatus}
              </span>
            </div>
            <button
              onClick={() => handleDelete(donation._id)}
              className="mt-3 sm:mt-0 sm:ml-4 self-end bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donations;
