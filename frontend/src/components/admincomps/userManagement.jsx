const AdminUsersTable = ({ users }) => {
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
                users.map((user, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">{user.name}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border">{user.role}</td>
                    <td className="p-3 border">
                      <span className={`px-2 py-1 rounded-lg text-white text-xs ${
                        user.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3 border">{user.name}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border">{new Date(user.createdAt).toLocaleDateString()}</td>
  
                    {/* Action buttons */}
                    <td className="p-3 border">
                      <div className="flex gap-2 justify-center">
                        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">View</button>
                        <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded">Edit</button>
                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
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

  export default AdminUsersTable