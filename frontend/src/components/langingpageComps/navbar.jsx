import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const [menuBar, setMenuBar] = useState(false);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-amber-500">
            <span className="text-amber-900">Food</span>
            <span className="text-green-500">Bridge</span>
        </h1>

        {/* Menu Icon */}
        <button
          onClick={() => setMenuBar(!menuBar)}
          className="text-black focus:outline-none md:hidden"
        >
          {menuBar ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
          <a href="/home" className="hover:text-amber-500 transition">Home</a>
          <a href="/how-it-works" className="hover:text-amber-500 transition">How it Works</a>
          <a href="/find-food" className="hover:text-amber-500 transition">Find Food</a>
          <a href="/donate" className="hover:text-amber-500 transition">Donate</a>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuBar && (
        <div className="md:hidden bg-amber-400 text-black w-full py-6 px-8 transition-all duration-300 ease-in-out">
          <nav>
            <ul className="flex flex-col space-y-4 text-lg font-semibold">
              <li>
                <a
                  href="/home"
                  className="hover:text-white transition"
                  onClick={() => setMenuBar(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  className="hover:text-white transition"
                  onClick={() => setMenuBar(false)}
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="/find-food"
                  className="hover:text-white transition"
                  onClick={() => setMenuBar(false)}
                >
                  Find Food
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="hover:text-white transition"
                  onClick={() => setMenuBar(false)}
                >
                  Donate
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
