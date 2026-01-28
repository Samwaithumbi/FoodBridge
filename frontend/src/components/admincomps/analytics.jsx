

const Analytics = ({ users = [], allDonations = [], availableDonations = [], requests = [] }) => {
  const stats = [
    { label: "Total Users", value: users.length },
    { label: "Total Donations", value: allDonations.length },
    { label: "Active Donations", value: availableDonations.length },
    { label: "Pending Requests", value: requests.length },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="w-full flex flex-col items-center justify-center p-5 rounded-xl shadow-md shadow-amber-900 bg-white "
        >
          <h2 className="text-2xl font-bold">{stat.value}</h2>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Analytics