import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="pt-24">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Together, We Can End Food Waste and Hunger
          </h1>
          <p className="text-gray-700 text-lg mt-4">
            Bridge the gap between surplus and need. Join a growing community of donors and organizations feeding hope.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/register"
              className="bg-amber-900 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Donate
            </Link>

            <Link
              to="/login"
              className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Find Food
            </Link>
          </div>
        </div>

        <img
          src="/hero.png"
          alt="Food donation"
          className="rounded-2xl shadow-lg w-full"
        />
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-10">How It Works</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Post Food",
              desc: "List surplus food with photos, location, and pickup details.",
            },
            {
              step: "02",
              title: "Connect",
              desc: "Families and organizations browse available donations.",
            },
            {
              step: "03",
              title: "Share",
              desc: "Coordinate pickup and deliver food to those in need.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-8 border border-amber-900 rounded-2xl hover:scale-105 transition"
            >
              <span className="text-amber-900 font-semibold">
                Step {item.step}
              </span>
              <h3 className="text-2xl font-semibold mt-2">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Hero;
