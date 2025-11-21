import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Mavjud rasmlarni import qilish
import product1 from "./assets/product1.jpg";
import product2 from "./assets/product2.jpg";
import product3 from "./assets/product3.jpg";
import burgerCheese from "./assets/burger_cheese.jpeg";
import chickenWings from "./assets/chicken_wings.jpeg";
import cola from "./assets/cola.jpeg";
import combo from "./assets/combo.jpeg";
import fanta from "./assets/fanta.jpeg";
import spinner from "./assets/spinner.jpeg";

// Kofe rasmlarini import qilish
import kofi from "./assets/kofi.png";
import kofi1 from "./assets/kofi1.png";
import kofi2 from "./assets/kofi2.png";
import kofi3 from "./assets/kofi3.png";

// Cart Context yaratish
export const CartContext = createContext();

// Barcha mahsulotlar ma'lumotlari
const productsData = [
  // Burgerlar (mavjud rasmlar)
  { 
    id: "plainBurger", 
    name: "GAMBURGER", 
    price: 10000, 
    kcal: 700, 
    img: product2,
    category: "burger"
  },
  { 
    id: "freshBurger", 
    name: "GAMBURGER FRESH", 
    price: 20500, 
    kcal: 900, 
    img: product1,
    category: "burger"
  },
  { 
    id: "freshCombo", 
    name: "FRESH COMBO", 
    price: 31900, 
    kcal: 1000, 
    img: product3,
    category: "burger"
  },
  { 
    id: "cheeseBurger", 
    name: "CHEESE BURGER", 
    price: 22000, 
    kcal: 720, 
    img: burgerCheese,
    category: "burger"
  },
  { 
    id: "combo", 
    name: "COMBO", 
    price: 25000, 
    kcal: 1200, 
    img: combo,
    category: "burger"
  },
  { 
    id: "spinner", 
    name: "SPINNER", 
    price: 18000, 
    kcal: 800, 
    img: spinner,
    category: "burger"
  },
  // Chicken mahsulotlari
  { 
    id: "chickenWings", 
    name: "CHICKEN WINGS", 
    price: 15000, 
    kcal: 600, 
    img: chickenWings,
    category: "chicken"
  },
  // Ichimliklar
  { 
    id: "cola", 
    name: "COCA-COLA", 
    price: 8000, 
    kcal: 140, 
    img: cola,
    category: "drink",
    volumes: [
      { size: "0.5L", price: 5000 },
      { size: "1L", price: 8000 },
      { size: "1.5L", price: 11000 },
      { size: "2L", price: 14000 }
    ]
  },
  { 
    id: "fanta", 
    name: "FANTA", 
    price: 8000, 
    kcal: 170, 
    img: fanta,
    category: "drink",
    volumes: [
      { size: "0.5L", price: 5000 },
      { size: "1L", price: 8000 },
      { size: "1.5L", price: 11000 },
      { size: "2L", price: 14000 }
    ]
  },
  // Kofe mahsulotlari
  { 
    id: "amerikano", 
    name: "AMERIKANO", 
    price: 12000, 
    kcal: 15, 
    img: kofi,
    category: "coffee",
    sizes: [
      { size: "Kichik", price: 10000 },
      { size: "O'rta", price: 12000 },
      { size: "Katta", price: 14000 }
    ]
  },
  { 
    id: "latte", 
    name: "LATTE", 
    price: 15000, 
    kcal: 180, 
    img: kofi1,
    category: "coffee",
    sizes: [
      { size: "Kichik", price: 13000 },
      { size: "O'rta", price: 15000 },
      { size: "Katta", price: 17000 }
    ]
  },
  { 
    id: "mocha", 
    name: "MOCHA", 
    price: 16000, 
    kcal: 290, 
    img: kofi2,
    category: "coffee",
    sizes: [
      { size: "Kichik", price: 14000 },
      { size: "O'rta", price: 16000 },
      { size: "Katta", price: 18000 }
    ]
  },
  { 
    id: "iceLatte", 
    name: "ICE LATTE", 
    price: 17000, 
    kcal: 160, 
    img: kofi3,
    category: "coffee",
    sizes: [
      { size: "Kichik", price: 15000 },
      { size: "O'rta", price: 17000 },
      { size: "Katta", price: 19000 }
    ]
  }
];

function App() {
  const [user, setUser] = useState(null);
  
  // Savatni boshlang'ich holati - barcha mahsulotlar uchun
  const initialCart = {};
  productsData.forEach(product => {
    initialCart[product.id] = {
      name: product.name,
      price: product.price,
      amount: 0,
      kcal: product.kcal,
      img: product.img,
      volumes: product.volumes || null,
      sizes: product.sizes || null,
      selectedVolume: product.volumes ? product.volumes[0] : null,
      selectedSize: product.sizes ? product.sizes[0] : null
    };
  });

  const [cart, setCart] = useState(initialCart);

  // Foydalanuvchi chiqib ketishi
  const logout = () => {
    setUser(null);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, productsData }}>
      <Router>
        <Header user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/cart" 
            element={user ? <Cart /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} 
          />
        </Routes>
        <Footer />
      </Router>
    </CartContext.Provider>
  );
}

export default App;