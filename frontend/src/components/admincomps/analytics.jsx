import { LuUsers } from "react-icons/lu";

const Analytics = ({users, allDonations,availableDonations, requests}) => {
  
  return (
    <>
      <div className="grid md:grid-cols-4 gap-4 justify-center mt-4">
        
        <div className="card">
          <LuUsers size={50} className="bg-blue-500 p-2 rounded-lg"/>
          <h2>{users.length}</h2>
          <p>Total Users</p>
        </div>

        <div className="card">
          <h2>{allDonations.length}</h2>
          <p>Total Donations</p>
        </div>

        <div className="card">
          <h2>{availableDonations.length}</h2>
          <p>Active Donations</p>
        </div>

        <div className="card">
          <h2>{requests.length}</h2>
          <p>Pending Requests</p>
        </div>

      </div>
    </>
  );
};

export default Analytics;
