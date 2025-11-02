import {Link} from "react-router-dom"

const Hero = () => {
    return ( 
      <div>
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16">
        {/* Text Section */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold  leading-tight">
            Together, We Can End Food Waste and Hunger
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mt-4">
            Bridge the gap between surplus and need. Join a growing community of donors and organizations feeding hope and fighting hunger.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <button className="bg-amber-900 hover:bg-amber-700 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md transition">
             <Link to="/register" >Donate</Link>
            </button>
            <button className="cursor-pointer bg-amber-900 hover:bg-amber-700 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md transition">
              Find Food
            </button>
          </div>
        </div>
      
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="/hero.png"
            alt="donation"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
      
      <div className="mt-10 px-6">
  <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
    How It Works
  </h1>

  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {/* Step 1 */}
    <div className="p-8 border border-amber-950 rounded-2xl shadow-green-800 hover:scale-105 transition-transform duration-300">
      <span className="text-amber-300 text-lg font-semibold">Step 01</span>
      <h2 className="text-2xl font-semibold text-black mt-2">Post Food</h2>
      <p className="text-lg text-black mt-2">
        List your surplus food with photos, location, and pickup details in minutes.
      </p>
    </div>
    <div className="p-8 border border-amber-950 rounded-2xl shadow-green-800 hover:scale-105 transition-transform duration-300">
      <span className="text-amber-300 text-lg font-semibold">Step 02</span>
      <h2 className="text-2xl font-semibold text-black mt-2">Connect</h2>
      <p className="text-lg text-black mt-2">
      Families and centers browse available donations in their neighborhood
      </p>
    </div>
    <div className="p-8 border border-amber-950 rounded-2xl shadow-green-800 hover:scale-105 transition-transform duration-300">
      <span className="text-amber-300 text-lg font-semibold">Step 03</span>
      <h2 className="text-2xl font-semibold text-black mt-2">Share</h2>
      <p className="text-lg text-black mt-2">
      Coordinate pickup times and bring fresh food home to enjoy!
      </p>
    </div>
    
    </div>
  </div>

    {/**real stories section */}

    <div className="my-12 px-6">
  <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
    Stories and Impact
  </h1>

  <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
    {/* Story Card 1 */}
    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition duration-300">
      <span className="text-2xl">⭐⭐⭐⭐⭐</span>
      <p className="text-lg text-gray-800 mt-3 leading-relaxed">
        "FoodBridge helped us redirect perfectly good food to families who need it.
        It feels amazing to make a difference instead of throwing food away."
      </p>

      <div className="flex items-center gap-4 mt-6">
        <img
          src="src/assets/hero.png"
          alt="donor image"
          className="w-16 h-16 rounded-full object-cover border-4 border-amber-500"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Sarah Johnson</h2>
          <p className="text-gray-600 text-sm">Restaurant Owner</p>
        </div>
      </div>
    </div>

    {/* Story Card 2 */}
    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition duration-300">
      <span className="text-2xl">⭐⭐⭐⭐⭐</span>
      <p className="text-lg text-gray-800 mt-3 leading-relaxed">
        "Through FoodBridge, our shelter consistently receives fresh meals from local donors.
        It’s made a huge difference for our community."
      </p>

      <div className="flex items-center gap-4 mt-6">
        <img
          src="src/assets/hero.png"
          alt="beneficiary image"
          className="w-16 h-16 rounded-full object-cover border-4 border-green-500"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">James Otieno</h2>
          <p className="text-gray-600 text-sm">Shelter Coordinator</p>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
     );
}
 
export default Hero;