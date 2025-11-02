
import { FaHandHoldingHeart, FaSeedling, FaUtensils, FaUsers } from "react-icons/fa";


const Stats = () => {


    const stats = [
    { value: 23, label: "Total Donations", icon: <FaHandHoldingHeart size={35} /> },
    { value: 12, label: "Active Campaigns", icon: <FaSeedling size={35} /> },
    { value: 342, label: "Lives Impacted", icon: <FaUsers size={35} /> },
    ];

    return ( 
        <div className="m-4 flex flex-col items-center gap-5 md:flex-row ">
       {stats.map((stat, index) => (
          <div
            key={index}
            className="w-[300px] md:w-[300px] h-[200px] flex flex-col justify-center items-center border border-green-400 bg-white text-black rounded-2xl shadow-md shadow-amber-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <p>{stat.icon}</p>
            <p className="text-5xl font-bold mb-2 text-orange-600">{stat.value}</p>
            <h2 className="text-lg font-semibold tracking-wide text-gray-700 text-center">
              {stat.label}
            </h2>
          </div>
        ))}
      </div>
      
     );
}
 
export default Stats;