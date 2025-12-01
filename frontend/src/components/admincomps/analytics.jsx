import { LuUsers, LuGift, LuClock } from "react-icons/lu";

const Analytics = ({
  users = [],
  allDonations = [],
  availableDonations = [],
  requests = []
}) => {
  const stats = [
    { label: "Total Users", value: users.length, icon: <LuUsers size={30} />, bg: "bg-blue-500" },
    { label: "Total Donations", value: allDonations.length, icon: <LuGift size={30} />, bg: "bg-green-500" },
    { label: "Active Donations", value: availableDonations.length, icon: <LuClock size={30} />, bg: "bg-yellow-500" },
    { label: "Pending Requests", value: requests.length, icon: <LuClock size={30} />, bg: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 mx-[60px]  md:grid-cols-4 md:m-0">
      {stats.map((stat, index) => (
        <div
          key={index}
          className=" border border-amber-600 w-[250px] flex flex-col items-center justify-center p-5 rounded-xl shadow-md bg-white"
        >
          <div className={`  p-3 mb-3 rounded-lg ${stat.bg} flex items-center justify-center text-white`}>
            {stat.icon}
          </div>
          <h2 className="text-2xl font-bold mb-1">{stat.value}</h2>
          <p className="text-gray-600 text-center">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
