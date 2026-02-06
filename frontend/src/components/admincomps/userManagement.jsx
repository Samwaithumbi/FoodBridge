import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import ViewUser from "./viewUser";
import api from "../../apis/axios"

const AdminUsersTable = ({ users, setUsers }) => {
  const [userDetails, setUserDetails] = useState({});
  const [viewUser, setViewUser] = useState(false);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  // Fetch users with search/role filters
  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/admin/users", {
        params: { q: search, role },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.log("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(fetchUsers, 400); // debounce typing
    return () => clearTimeout(delay);
  }, [search, role]);

  // View user details
  const handleUser = async (id) => {
    try {
      const res = await api.get(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(res.data);
    } catch (error) {
      console.log("Failed to fetch user info", error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
      if (viewUser) setViewUser(false); // close modal if open
    } catch (error) {
      console.log("Failed to delete user", error);
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow">
        <h1>User Management</h1>

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="Donor">Donor</option>
            <option value="Beneficiary">Beneficiary</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Table */}
        <div className="relative -mx-6 sm:mx-0 overflow-x-auto">
          <table className="min-w-[100px] w-full border-collapse  ">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                <th className="p-3 border">Name</th>
                <th className="p-3 border hidden md:table-cell">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border  hidden md:table-cell">Status</th>
                <th className="p-3 border  hidden md:table-cell">Location</th>
                <th className="p-3 border  hidden md:table-cell">Donations</th>
                <th className="p-3 border  hidden md:table-cell">Join Date</th>
                <th className="p-3 border text-center  hidden md:table-cell">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">{user.name}</td>
                    <td className="p-3 border hidden md:table-cell">{user.email}</td>
                    <td className="p-3 border">{user.role}</td>
                    <td className="p-3 border  hidden md:table-cell">{user.isActive ? "Active" : "Inactive"}</td>
                    <td className="p-3 border  hidden md:table-cell">{user.location || "N/A"}</td>
                    <td className="p-3 border  hidden md:table-cell">{user.donations?.length || 0}</td>
                    <td className="p-3 border  hidden md:table-cell">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 border  hidden md:table-cell">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                          onClick={() => {
                            handleUser(user._id);
                            setViewUser(true);
                          }}
                        >
                          <LuEye />
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                          onClick={() => handleDelete(user._id)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View User Modal */}
      {viewUser && (
        <ViewUser
          setViewUser={setViewUser}
          userDetails={userDetails}
          token={token}
          setUserDetails={setUserDetails}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default AdminUsersTable;
