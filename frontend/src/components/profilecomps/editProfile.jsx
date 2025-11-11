import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Edit3, Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfile = ({ userProfile, setUserProfile, setIsEditing }) => {
  const [formData, setFormData] = useState({
    username: userProfile?.username || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    role: userProfile?.role || "",
    location: userProfile?.location || "",
    profilePic: userProfile?.profilePic || "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(formData.profilePic || "");
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));

  // 🧠 Handle text change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🧠 Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ One function to handle both image + text update
  const handleSubmit = async () => {
   
    const id = userData._id;

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("role", formData.role);
    data.append("location", formData.location);
    if (selectedFile) data.append("profilePic", selectedFile);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/auth/edit-profile/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserProfile(res.data);
      localStorage.setItem("userData", JSON.stringify(res.data));
      setIsEditing(false);
      toast.success("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("❌ Update failed. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full relative">
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-300" />
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <img
            src={preview || "/default-avatar.png"}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
          />

          <label className="mt-3 cursor-pointer text-sm text-blue-600 hover:underline">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex items-center mt-3 border p-2 rounded-2xl font-semibold gap-2"
            >
              <MdCancel /> Cancel
            </button>

            <button
              type="submit"
              form="edit-profile-form"
              onSubmit={handleSubmit} 
              className="mt-3 px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
            >
              <Edit3 className="w-4 h-4" /> Save changes
            </button>
          </div>
        </div>
      </div>

      <form id="edit-profile-form" className="mt-24 max-w-6xl w-full grid md:grid-cols-3 gap-6 px-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
          <p className="text-sm text-gray-500 mb-4">
            Your personal details and contact information
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Full Name</p>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                className="border p-1.5 w-[250px]"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-lg font-semibold">
                <Mail className="w-4 h-4 text-gray-500" />
                Email
              </p>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="border p-1.5 w-[250px]"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-lg font-semibold">
                <Phone className="w-4 h-4 text-gray-500" />
                Phone Number
              </p>
              <input
                type="text"
                id="phone"
                name="phone"
                className="border p-1.5 w-[250px]"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-lg font-semibold">
                <Phone className="w-4 h-4 text-gray-500" />
                Role
              </p>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                className="border p-1.5 w-[250px]"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Location & Links */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location || ""}
                className="border p-1.5 w-full"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;