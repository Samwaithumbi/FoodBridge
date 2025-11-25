import { MdCancel, MdDelete, MdEdit, MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { GoCircleSlash } from "react-icons/go";
import axios from "axios";
import { useState } from "react";
import getInitials from "../../utils/avatar";

const ViewUser = ({ setViewUser, userDetails, token, handleDelete }) => {
  const [editUser, setEditUser] = useState(false);
  const [formData, setFormData] = useState({
    name: userDetails.name || "",
    email: userDetails.email || "",
    role: userDetails.role || "",
    phone:userDetails.phone || "",
    location:userDetails.location || "",
    status:userDetails.status || ""
  });

  const initials = getInitials(userDetails.name);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // PATCH request
  const handleEditUser = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/admin/users/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("User updated:", res.data);

      alert("User updated successfully!");
      setEditUser(false); // close edit modal
    } catch (error) {
      console.error("❌ Edit error:", error.message);
      alert("Failed to update user.");
    }
  };

  return (
    <>
      {/* MAIN USER VIEW MODAL */}
      {!editUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[450px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">

            {/* Header */}
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold">User Details</h2>
                <p className="font-medium">View and Manage User Details</p>
              </div>
              <button onClick={() => setViewUser(false)}>
                <MdCancel size={22} />
              </button>
            </div>

            {/* Profile */}
            <div className="flex gap-2 bg-gray-50 p-3 rounded-lg mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-green-600 text-white rounded-full text-xl font-bold">
                {initials}
              </div>
              <div>
                <h3 className="font-medium text-2xl">{userDetails.name}</h3>
                <p className="text-green-500">{userDetails.role || "N/A"}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-lg text-gray-500">Email</p>
                <p className="flex items-center gap-1 font-semibold">
                  <MdOutlineEmail className="text-gray-500" />
                  {userDetails.email}
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Phone</p>
                <p className="flex items-center gap-1 font-semibold">
                  <FaPhone className="text-gray-500" /> 011221212
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Role</p>
                <p className="font-semibold">{userDetails.role}</p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Location</p>
                <p className="flex items-center gap-1 font-semibold">
                  <CiLocationOn className="text-gray-500" />
                  Kiambu
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Join Date</p>
                <p className="flex items-center gap-1 font-semibold">
                  <CiCalendarDate className="text-gray-500" />
                  {new Date(userDetails.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-500">Total Donations</p>
                <p className="font-semibold">127</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between gap-3 mt-6">
              <button
                onClick={() => {
                  handleDelete(userDetails._id);
                  setViewUser(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg flex gap-1 items-center"
              >
                <MdDelete size={18} />
              </button>

              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg flex gap-1 items-center">
                <GoCircleSlash />
                Suspend
              </button>

              <button
                onClick={() => setEditUser(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg flex gap-1 items-center"
              >
                <MdEdit size={18} /> Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[450px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
            <div className="text-center mb-3">
              <h3 className="text-xl font-bold">Edit User</h3>
              <p className="text-gray-600">Update user information</p>
            </div>

            <form className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="border p-2 rounded shadow shadow-gray-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="border p-2 rounded shadow shadow-gray-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label>Phone</label>
                <input
                  type="number"
                  name="phone"
                  className="border p-2 rounded shadow shadow-gray-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="border p-2 rounded shadow shadow-gray-500"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label>Role</label>
                <select
                  name="role"
                  className="border p-2 rounded shadow shadow-gray-500"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="donor">Donor</option>
                  <option value="beneficiary">Beneficiary</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label>status</label>
                <select
                  name="status"
                  className="border p-2 rounded shadow shadow-gray-500"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="admin">Active</option>
                  <option value="donor">Domant</option>
                  <option value="beneficiary">Inactive</option>
                </select>
              </div>
            </form>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setEditUser(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => handleEditUser(userDetails._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUser;
