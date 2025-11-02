import AddDonation from "./addDonation";

const DonorWelcome = () => {
  
  // Dynamically greet donor by time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const donorName = "Samuel";




  return (
    <section className="m-4 flex flex-col md:flex-row justify-between items-start md:items-center bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
      {/* Welcome Text */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">
          {getGreeting()}, <br />
          <span className="text-orange-600">{donorName}</span>
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          You are making a <span className="font-semibold text-green-600">real difference</span> in fighting hunger.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Thank you for supporting communities in need through <span className="font-medium">Footbridge</span>.
        </p>
      </div>

     <AddDonation/>
    </section>
  );
};

export default DonorWelcome;
