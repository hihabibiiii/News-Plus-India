import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Home",
    "India",
    "Politics",
    "World",
    "Sports",
    "Business",
    "Technology",
    "Entertainment",
    "Health",
  ];

  

  const handleClick = (cat) => {
    if (cat === "Home") {
      navigate("/");
    } else {
      navigate(`/category/${cat.toLowerCase()}`);
    }
    setOpen(false);
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      {/* 🔥 HEIGHT INCREASED */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* 🔴 LOGO + NAME (BIGGER) */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.jpg"
            alt="News Plus India"
            className="h-15 w-15 object-contain"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-red-500 tracking-wide">
            News Plus India
          </h1>
        </div>

        {/* 🔹 DESKTOP NAV (BIGGER TEXT) */}
        <nav className="hidden md:flex gap-8 text-xl font-semibold ">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleClick(cat)}
              className="hover:text-red-400 transition"
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* 📱 MOBILE BUTTON (BIGGER) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden border border-gray-600 px-4 py-2 rounded text-base"
        >
          ☰ Menu
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-gray-900 px-6 py-4 space-y-4 text-base font-medium">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleClick(cat)}
              className="block w-full text-left border-b border-gray-700 pb-2 hover:text-red-400"
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
