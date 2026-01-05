import { useEffect, useState } from "react";
import api from "../../apis/axios";

const Donations = ({ donations, setDonations }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await api.get("/api/donations/my-donations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(res.data.donations || res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load donations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonations();
  }, [setDonations, token]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/donations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const safeDonations = Array.isArray(donations) ? donations : [];

  const filteredDonations = safeDonations.filter((donation) => {
    const matchesStatus =
      statusFilter === "All" || donation.donationStatus === statusFilter;
  
    const matchesSearch =
      donation.title.toLowerCase().includes(search.toLowerCase()) ||
      donation.location.toLowerCase().includes(search.toLowerCase());
  
    return matchesStatus && matchesSearch;
  });
  

  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        Loading donations...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Available":
        return "bg-green-100 text-green-800 border border-green-300";
      case "Claimed":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "Rejected":
        return "bg-red-100 text-red-800 border border-red-300";
      case "Expired":
        return "bg-gray-200 text-gray-700 border border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center md:text-left">
        My Donations
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="All">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
          <option value="Claimed">Claimed</option>
          <option value="Rejected">Rejected</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      {/* Empty filter state */}
      {filteredDonations.length === 0 && (
        <p className="text-center mt-10 text-gray-400 italic text-lg">
          No donations match your filter criteria.
        </p>
      )}

      {/* Donations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDonations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md 
                       hover:shadow-xl transition-all duration-300 
                       overflow-hidden flex flex-col"
          >
            <img
              src={donation.image || "/hero.png"}
              alt={donation.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {donation.title}
              </h2>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {donation.description}
              </p>

              <div className="mt-3 text-sm space-y-1">
                <p className="font-medium text-gray-700">
                  Quantity:{" "}
                  <span className="font-semibold text-green-700">
                    {donation.quantity} Kg
                  </span>
                </p>

                <p className="text-gray-600 italic">{donation.location}</p>

                <p className="text-xs text-gray-400">
                  Posted on{" "}
                  {new Date(donation.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  donation.donationStatus
                )}`}
              >
                {donation.donationStatus}
              </span>

              <button
                onClick={() => handleDelete(donation._id)}
                className="mt-5 bg-red-500 hover:bg-red-600 text-white font-medium py-2 
                           rounded-xl transition-all duration-200 w-full"
              >
                Delete Donation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donations;

