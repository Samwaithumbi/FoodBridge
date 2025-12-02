import { FaHandHoldingHeart, FaSeedling, FaUsers } from "react-icons/fa";

const Stats = () => {
  const stats = [
    { value: 23, label: "Total Donations", icon: <FaHandHoldingHeart size={40} className="text-green-600" /> },
    { value: 12, label: "Active Campaigns", icon: <FaSeedling size={40} className="text-green-600" /> },
    { value: 342, label: "Lives Impacted", icon: <FaUsers size={40} className="text-green-600" /> },
  ];

  return (
    <div className="px-4 md:px-10 py-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="w-[260px] h-[200px] bg-white border border-green-300 rounded-2xl 
                       shadow-md hover:shadow-xl transition-all duration-300 
                       flex flex-col items-center justify-center hover:-translate-y-1"
          >
            <div className="mb-3">{stat.icon}</div>

            <p className="text-4xl font-extrabold text-orange-600">
              {stat.value}
            </p>

            <h2 className="text-lg font-semibold text-gray-700 text-center mt-1">
              {stat.label}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
