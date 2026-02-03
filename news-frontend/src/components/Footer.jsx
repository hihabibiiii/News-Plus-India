import { Link } from "react-router-dom";

function Footer() {
  const categories = [
    "India",
    "Politics",
    "World",
    "Sports",
    "Business",
    
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand */}
        <div>
          <h3 className="text-xl font-bold text-white">
            News Plus India
          </h3>
          <p className="mt-3 text-sm text-gray-400">
            Latest breaking news, politics, sports, business and technology
            from India and the world.
          </p>
        </div>

        {/* Column 2: Categories */}
        <div>
          <h4 className="text-white font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/category/${cat.toLowerCase()}`}
                  className="hover:text-white"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/advertise" className="hover:text-white">
                Advertise
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Social Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">▶️</a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Stay connected with us on social media
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} News Plus India. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
