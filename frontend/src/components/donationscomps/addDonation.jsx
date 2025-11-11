import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddDonation = ({donations, setDonations}) => {
  const [addDonation, setAddDonation] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity:"",
    image: "",
    location: "",
    expiryDate: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle text and date changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image change separately
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const { title, description,quantity, image, location, expiryDate } = formData;
    if (!title || !description || !quantity || !image || !location || !expiryDate) {
      return toast.warning("All fields are required");
    }

    try {
      setIsLoading(true);

      // Create form data for file upload
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("quantity", quantity);
      data.append("image", image);
      data.append("location", location);
      data.append("expiryDate", expiryDate);

      const token = localStorage.getItem("token");

      const today = new Date();
    const chosenDate = new Date(expiryDate);

    // Remove the time part for accurate date-only comparison
    today.setHours(0, 0, 0, 0);
    chosenDate.setHours(0, 0, 0, 0);

    if (chosenDate < today) {
      toast.error("Expiry date cannot be in the past!");
      return;
    }

      const res = await axios.post("http://localhost:3000/api/donations/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
      });

      console.log("Donation created:", res.data);
      setAddDonation(false);
      setFormData({ title: "", description: "", quantity:"", image: null, location: "", expiryDate: "" });
      toast.success("Donation created")
    } catch (error) {
      console.log("Error posting:", error);
      toast.error("Failed to create donation")
      setError(error.response?.data?.message || "Donation failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-4 md:mt-0">
        <button
          className="flex items-center gap-2 bg-orange-600 text-white text-lg font-semibold px-5 py-3 rounded-xl transition-all duration-300 hover:bg-orange-500 hover:scale-105 shadow-md"
          onClick={() => setAddDonation(true)}
        >
          <FaPlus size={22} />
          Add Donation
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-2 text-center text-gray-600">Submitting donation...</div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-2 text-center text-red-600 font-medium">{error}</div>
      )}

      {/* Modal Form */}
      {addDonation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="relative bg-amber-100 text-gray-800 p-6 rounded-2xl shadow-xl w-[350px] sm:w-[400px] transition-all">
            <button
              onClick={() => setAddDonation(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
              Add Donation
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="block font-medium mb-1">
                  Food Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label htmlFor="description" className="block font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none resize-none"
                ></textarea>
              </div>
              <div>
                <label htmlFor="quantity" className="block font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
                <label htmlFor="image" className="block font-medium mb-1">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label htmlFor="location" className="block font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label htmlFor="expiryDate" className="block font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all"
              >
                {isLoading ? "Creating..." : "Add Donation"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDonation;
