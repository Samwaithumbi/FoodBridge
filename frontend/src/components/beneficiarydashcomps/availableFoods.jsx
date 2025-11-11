import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AvailableFood = () => {
  const [availableDonations, setAvailableDonations] = useState([]);
  const token =localStorage.getItem('token')

  //fetching donations
  useEffect(() => {
    const fetchAvailableDonations = async () => {
      let currentDate = new Date()
      console.log(currentDate);
      try {
        const res = await axios.get(
          "http://localhost:3000/api/donations/all-donations"
        );
        setAvailableDonations(res.data.donations);
      } catch (error) {
        console.log(error.message);
        toast.error("❌Failed to fetch available donations")
      }
    };

    fetchAvailableDonations();
  }, []);

  //requesting donation
  const handleRequest=async(donationId)=>{
    try {
      const res=await axios.post("http://localhost:3000/api/donations/requests", {donationId}, {
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'application/json'
        }
      } )
      console.log("req successfully", res.data);
      toast.success("✅Request was successfully")
    } catch (error) {
      console.error("Request failed:", error.response?.data || error.message);
      toast.error("❌Request failed");
    }
  }

  

 
  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-green-700">Available Food</h1>
        <p className="text-gray-600 mt-2">
          Browse and request available food donations near you.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by food name or description..."
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableDonations.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No available food at the moment.
          </p>
        ) : (
          availableDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg"
            >
              <img
                src={donation.image || "hero.png"}
                alt={donation.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {donation.title}
                </h3>

                <p className="text-gray-600 mt-2">{donation.description}</p>

                <div className="flex justify-between text-sm text-gray-700 mt-4">
                  <div>
                    <p className="font-medium">Quantity</p>
                    <span className="font-bold text-green-700">
                      {donation.quantity} Kg
                    </span>
                  </div>

                  <div>
                    <p className="font-medium">Expires In</p>
                    <span className="font-bold text-red-600">
                      {new Date(donation.expiryDate).toLocaleDateString() || "N/A"}
                    </span>
                  </div>

                  <div>
                    <p className="font-medium">Location</p>
                    <span className="font-bold text-gray-800">
                      {donation.location} 
                    </span>
                  </div>
                </div>

                <button 
                onClick={()=>handleRequest(donation._id)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
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
