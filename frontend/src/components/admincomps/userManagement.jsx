import axios from "axios";
import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const AdminUsersTable = ({ users,setUsers }) => {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjQ2NjFmMDVjY2Y3MDFjYzVlMGZkMiIsImlhdCI6MTc2Mzk5MzExOSwiZXhwIjoxNzY2NTg1MTE5fQ.VtBdfkRtbzaz_8ZaSEoUkjNQZnsVYToego7vwxcKozY";


    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/admin/users/${id}`,{
          headers:{Authorization:`Bearer ${token}`}
        });
        console.log("Deleted user:", id);
        setUsers(prev => prev.filter(user => user._id !== id));
      } catch (error) {
        console.log("Failed to delete:", error);
      }
    };
  

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h1>User Management</h1>

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
        />

        <select className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-40">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Donor</option>
          <option>Recipient</option>
        </select>
      </div>

      {/* Responsive Scroll */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-max w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Donations</th>
              <th className="p-3 border">Join Date</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.role}</td>
                  <td className="p-3 border">{user.isActive}</td>
                  <td className="p-3 border">{user.location || "N/A"}</td>
                  <td className="p-3 border">{user.donations?.length || 0}</td>
                  <td className="p-3 border">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Action buttons */}
                  <td className="p-3 border">
                    <div className="flex gap-2 justify-center">
                      <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                        <LuEye />
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersTable;
