import { FaHandHoldingHeart, FaSeedling, FaUsers } from "react-icons/fa";

const Stats = ({ donations }) => {
  const safeDonations = Array.isArray(donations) ? donations : [];

  const totalDonations = safeDonations.length;

  const activeDonations = safeDonations.filter(
    (d) => d.donationStatus === "Available"
  ).length;

  const livesImpacted = safeDonations.reduce(
    (sum, d) => sum + (Number(d.quantity) || 0),
    0
  );

  const stats = [
    {
      label: "Total Donations",
      value: totalDonations,
      icon: <FaHandHoldingHeart size={36} />,
    },
    {
      label: "Active Donations",
      value: activeDonations,
      icon: <FaSeedling size={36} />,
    },
    {
      label: "Kg of Food Shared",
      value: livesImpacted,
      icon: <FaUsers size={36} />,
    },
  ];

  return (
    <div className="px-4 md:px-10 py-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6
                       flex items-center gap-4 hover:shadow-md transition"
          >
            <div className="text-green-600">{stat.icon}</div>
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
