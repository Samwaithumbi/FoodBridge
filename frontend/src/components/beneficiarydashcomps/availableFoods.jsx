import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AvailableFood = ({ reqStatus, setReqStatus }) => {
  const [availableDonations, setAvailableDonations] = useState([]);
  const token = localStorage.getItem("token");

  // Fetching available donations
  useEffect(() => {
    const fetchAvailableDonations = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/donations/available");
        setAvailableDonations(res.data.donations);
      } catch (error) {
        console.log(error.message);
        toast.error("❌Failed to fetch available donations");
      }
    };

    fetchAvailableDonations();
  }, []);

  // Requesting donation
  const handleRequest = async (donationId) => {
    setReqStatus("Pending");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/requests/create",
        { donationId, reqStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("req successfully", res.data);
      toast.success("✅Request was successful");
    } catch (error) {
      if (error.response?.status === 400) {
        toast.warning(error.response.data.message);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-green-700">Available Food</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Browse and request food donations provided by local donors.
        </p>
      </div>

      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by food name or description..."
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm 
                     focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* Donation Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {availableDonations.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full text-lg">
            No available food at the moment.
          </p>
        ) : (
          availableDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden 
                         transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={donation.image || "hero.png"}
                alt={donation.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {donation.title}
                </h3>

                <p className="text-gray-600 mt-2 line-clamp-2">
                  {donation.description}
                </p>

                <div className="grid grid-cols-3 text-center mt-6">
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-bold text-green-700">{donation.quantity} Kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expires</p>
                    <p className="font-bold text-red-600">
                      {new Date(donation.expiryDate).toLocaleDateString() || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-bold text-gray-800">{donation.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-gray-800">{donation.reqStatus}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleRequest(donation._id)}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white 
                             font-medium py-3 rounded-xl transition-all duration-200"
                >
                  Request Food
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableFood;
