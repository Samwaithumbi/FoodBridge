import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white mt-20" id="contact">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div >
          <h2 className="text-3xl font-extrabold mb-3 text-white">FoodBridge</h2>
          <p className="text-lg text-white">
            Bridging surplus food to those who need it most.
          </p>
          <div className="flex gap-4 mt-4 ">
            <FaInstagramSquare size={28} className="cursor" />
            <FaLinkedin size={28} />
            <FaTwitterSquare size={28} />
            <FaFacebookSquare size={28} />
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/stories">Stories</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Involved */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Get Involved</h3>
          <ul className="space-y-2">
            <li><Link to="/register">Donate Food</Link></li>
            <li><Link to="/partners">Become a Partner</Link></li>
            <li><Link to="/volunteer">Volunteer</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-3 rounded-l-lg w-full text-black"
            />
            <button className="bg-black px-4 rounded-r-lg">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4">
        © {new Date().getFullYear()} FoodBridge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
