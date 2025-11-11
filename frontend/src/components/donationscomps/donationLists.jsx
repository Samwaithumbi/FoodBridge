import axios from "axios";
import { useEffect, useState } from "react";

const Donations = ({donations, setDonations}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/donations/my-donations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(res.data);
      } catch (error) {
        console.log("Error fetching donations:", error);
        setError("Failed to load donations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonations();
  }, []);

  if (isLoading) {
    return <p className="text-center mt-5">Loading donations...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-5">{error}</p>;
  }

  if (donations.length === 0) {
    return <p className="text-center mt-5">No donations available yet.</p>;
  }

    const handleDelete = async(id)=>{
      
      try {
        const res = await axios.delete(`http://localhost:3000/api/donations/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        console.log("Deleted", res.data);
        setDonations((prev) => prev.filter((d) => d._id !== id));
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    }
  
  

  return (
    <div className="m-4">
      <h1 className="text-2xl font-semibold text-green-700 mb-3">Donations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2">
      {donations.map((donation) => (
        <div
          key={donation._id}
          className="flex items-center justify-between border border-gray-300 rounded-lg shadow-md bg-white p-4 w-full max-w-md"
        >
          <div className="flex items-center gap-4">
            <img
              src={donation.image || "/hero.png"}
              alt={donation.title}
              className="w-[100px] h-[100px] object-cover rounded-md"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {donation.title}
              </h2>
              <p className="text-gray-600 text-sm">{donation.description}</p>
              <p className="text-sm text-gray-700">{donation.quantity} Kg</p>
              <p className="text-gray-500 text-sm italic">
                {donation.location}
              </p>
              <p className="text-xs text-gray-400">
                Posted on {new Date(donation.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
          <div className="ml-3 text-green-600 font-semibold">Available</div>
          <button
           className="bg-red-400 p-2 text-amber-50 text-lg font-semibold rounded-4xl hover:bg-red-600 "
           onClick={()=>handleDelete(donation._id)}
          >Delete</button>
          </div>
        </div>
      ))}
      </div>
      
    </div>
  );
};

export default Donations;
