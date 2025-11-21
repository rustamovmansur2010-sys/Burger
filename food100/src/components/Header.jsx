import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../App";

function Header({ user }) {
  const { cart } = useContext(CartContext);
  
  // Savatdagi jami mahsulotlar sonini hisoblash
  const totalItems = Object.values(cart).reduce((total, item) => total + item.amount, 0);

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">FOOD100</h1>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:text-green-400 transition-colors">Asosiy</Link></li>
          <li><Link to="/menu" className="hover:text-green-400 transition-colors">Menyu</Link></li>
          <li><Link to="/contact" className="hover:text-green-400 transition-colors">Xarita</Link></li>
          <li className="relative">
            <Link to="/cart" className="hover:text-green-400 transition-colors flex items-center">
              Savat
              {totalItems > 0 && (
                <span className="ml-1 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
        <div>
          {user ? (
            <span className="text-green-400">Salom, {user.name}</span>
          ) : (
            <Link to="/login" className="hover:text-green-400 transition-colors">Kirish</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;