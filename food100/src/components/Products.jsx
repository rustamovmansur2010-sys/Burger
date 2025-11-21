import { useState, useContext } from "react";
import { CartContext } from "../App";

export default function Products() {
  const { cart, setCart, productsData } = useContext(CartContext);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVolumes, setSelectedVolumes] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const addToCart = (productId, product) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      
      // Agar ichimlik bo'lsa va volume tanlangan bo'lsa
      if (product.volumes && selectedVolumes[productId]) {
        const selectedVolume = product.volumes.find(v => v.size === selectedVolumes[productId]);
        updatedCart[productId] = {
          ...updatedCart[productId],
          amount: updatedCart[productId].amount + 1,
          selectedVolume: selectedVolume,
          price: selectedVolume.price,
          volume: selectedVolume.size
        };
      } 
      // Agar kofe bo'lsa va size tanlangan bo'lsa
      else if (product.sizes && selectedSizes[productId]) {
        const selectedSize = product.sizes.find(s => s.size === selectedSizes[productId]);
        updatedCart[productId] = {
          ...updatedCart[productId],
          amount: updatedCart[productId].amount + 1,
          selectedSize: selectedSize,
          price: selectedSize.price,
          size: selectedSize.size
        };
      } else {
        // Oddiy mahsulot
        updatedCart[productId].amount += 1;
      }
      
      return updatedCart;
    });
  };

  const handleVolumeChange = (productId, volumeSize) => {
    setSelectedVolumes(prev => ({
      ...prev,
      [productId]: volumeSize
    }));
  };

  const handleSizeChange = (productId, sizeName) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: sizeName
    }));
  };

  // Kategoriyalar
  const categories = [
    { id: "all", name: "Barchasi" },
    { id: "burger", name: "Burgerlar" },
    { id: "drink", name: "Ichimliklar" },
    { id: "chicken", name: "Chicken" },
    { id: "coffee", name: "Kofe" }
  ];

  // Filtrlangan mahsulotlar
  const filteredProducts = activeCategory === "all" 
    ? productsData 
    : productsData.filter(product => product.category === activeCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Kategoriyalar */}
      <div className="flex gap-4 mb-8 justify-center flex-wrap">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Mahsulotlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          // Narxni hisoblash
          let currentPrice = product.price;
          if (product.volumes && selectedVolumes[product.id]) {
            currentPrice = product.volumes.find(v => v.size === selectedVolumes[product.id]).price;
          } else if (product.volumes && !selectedVolumes[product.id]) {
            currentPrice = product.volumes[0].price;
          }
          
          if (product.sizes && selectedSizes[product.id]) {
            currentPrice = product.sizes.find(s => s.size === selectedSizes[product.id]).price;
          } else if (product.sizes && !selectedSizes[product.id]) {
            currentPrice = product.sizes[0].price;
          }

          return (
            <div key={product.id} className="border rounded-lg shadow-lg p-4 text-center bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img 
                src={product.img} 
                alt={product.name} 
                className="h-48 w-full object-cover mb-4 rounded-lg"
              />
              <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
              
              {/* Volume selector (ichimliklar uchun) */}
              {product.volumes && (
                <div className="mb-3">
                  <select 
                    value={selectedVolumes[product.id] || product.volumes[0].size}
                    onChange={(e) => handleVolumeChange(product.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-green-600 outline-none"
                  >
                    {product.volumes.map(volume => (
                      <option key={volume.size} value={volume.size}>
                        {volume.size} - {volume.price.toLocaleString()} so'm
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Size selector (kofe uchun) */}
              {product.sizes && (
                <div className="mb-3">
                  <select 
                    value={selectedSizes[product.id] || product.sizes[0].size}
                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-green-600 outline-none"
                  >
                    {product.sizes.map(size => (
                      <option key={size.size} value={size.size}>
                        {size.size} - {size.price.toLocaleString()} so'm
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Narx va kaloriya */}
              <p className="text-green-700 font-semibold text-lg mb-1">
                {currentPrice.toLocaleString()} so'm
              </p>
              <p className="text-gray-600 mb-4">{product.kcal} kcal</p>
              
              <button 
                onClick={() => addToCart(product.id, product)}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
              >
                Savatga qo'shish
              </button>
              
              {cart[product.id].amount > 0 && (
                <div className="mt-2 text-sm text-green-600 font-medium">
                  Savatda: {cart[product.id].amount} ta
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}