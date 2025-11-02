const Footer = () => {
    return ( 
        <div>
            <footer className="bg-amber-500 text-black py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div>
            <h2 className="text-3xl font-extrabold mb-3">FoodBridge</h2>
            <p className="text-lg leading-relaxed">
                Bridging surplus food to those who need it most. Together, we’re building a hunger-free community.
            </p>
            <div className="flex gap-4 mt-4">
                <a href="#" className="hover:text-white transition-colors">🌐</a>
                <a href="#" className="hover:text-white transition-colors">🐦</a>
                <a href="#" className="hover:text-white transition-colors">📸</a>
                <a href="#" className="hover:text-white transition-colors">💼</a>
            </div>
            </div>

            {/* Quick Links */}
            <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-lg">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
            </div>

            {/* Get Involved */}
            <div>
            <h3 className="text-xl font-semibold mb-3">Get Involved</h3>
            <ul className="space-y-2 text-lg">
                <li><a href="#" className="hover:text-white transition-colors">Donate Food</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Become a Partner</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Join Our Team</a></li>
            </ul>
            </div>

            {/* Newsletter */}
            <div>
            <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
            <p className="text-lg mb-3">Subscribe to our newsletter for updates and impact stories.</p>
            <form className="flex">
                <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-l-lg w-full outline-none"
                />
                <button className="bg-black text-white px-4 py-3 rounded-r-lg hover:bg-gray-800 transition">
                Subscribe
                </button>
            </form>
            </div>
        </div>

        <div className="border-t border-black mt-10 pt-6 text-center text-base">
            <p>
            © {new Date().getFullYear()} <span className="font-semibold">FoodBridge</span>.  
            All rights reserved. Made with ❤️ by <span className="font-bold">Samuel Mwangi</span>.
            </p>
        </div>
        </footer>

        </div>
     );
}
 
export default Footer;