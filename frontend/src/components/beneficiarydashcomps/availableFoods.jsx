import React from "react";

const AvailableFood = () => {
  return (
    <div className="px-6 py-8 bg-gray-50 ">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-green-700">Available Food</h1>
        <p className="text-gray-600 mt-2">
          Browse and request available food donations near you.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by food name or description..."
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* Food Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="flex flex-col ">
          {/* Image */}
          <div className="md:w-1/3">
            <img
              src="hero.png"
              alt="Food donation"
              className="w-full h-48 md:w-full md:h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="p-5 md:w-2/3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Fresh Vegetable Bundle
              </h3>
              <p className="text-gray-600 mt-2">
                Assorted fresh vegetables including carrots and broccoli.
              </p>

              <div className="flex justify-between text-sm text-gray-700 mt-4">
                <div>
                  <p className="font-medium">Quantity</p>
                  <span className="font-bold text-green-700">10 kg</span>
                </div>
                <div>
                  <p className="font-medium">Expires In</p>
                  <span className="font-bold text-red-600">3 days</span>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <span className="font-bold text-gray-800">Kutus</span>
                </div>
              </div>
            </div>

            <button className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
              Request Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableFood;
