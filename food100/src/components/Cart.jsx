import { useState, useContext } from "react";
import { CartContext } from "../App";

export default function Cart() {
  const { cart, setCart, productsData } = useContext(CartContext);
  const [receiptOpen, setReceiptOpen] = useState(false);

  const updateCount = (id, type) => {
    setCart(prev => {
      const updatedCart = { ...prev };
      if (type === "+") updatedCart[id].amount++;
      if (type === "-" && updatedCart[id].amount > 0) updatedCart[id].amount--;
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const updatedCart = { ...prev };
      updatedCart[id].amount = 0;
      return updatedCart;
    });
  };

  const getReceipt = () => {
    let text = "FOOD100\n";
    text += "====================\n\n";
    let total = 0;
    let kcalTotal = 0;
    let hasItems = false;
    
    Object.keys(cart).forEach(key => {
      const f = cart[key];
      if (f.amount > 0) {
        hasItems = true;
        const sum = f.price * f.amount;
        const kcal = f.kcal * f.amount;
        text += `${f.name}`;
        if (f.volume) text += ` (${f.volume})`;
        if (f.size) text += ` (${f.size})`;
        text += `\n`;
        text += `${f.amount} x ${f.price.toLocaleString()} = ${sum.toLocaleString()} so'm\n`;
        text += `Kaloriya: ${kcal} kcal\n\n`;
        total += sum;
        kcalTotal += kcal;
      }
    });
    
    if (!hasItems) {
      return "Savatda mahsulot yo'q";
    }
    
    text += "====================\n";
    text += `Umumiy summa: ${total.toLocaleString()} so'm\n`;
    text += `Umumiy kaloriya: ${kcalTotal} kcal\n\n`;
    text += "Rahmat!";
    
    return text;
  };

  const clearCart = () => {
    setCart(prev => {
      const clearedCart = { ...prev };
      Object.keys(clearedCart).forEach(key => {
        clearedCart[key].amount = 0;
      });
      return clearedCart;
    });
  };

  // Savatda mahsulot bormi?
  const hasItems = Object.values(cart).some(item => item.amount > 0);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Savat</h2>
      
      {!hasItems ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Savatda mahsulot yo'q</p>
          <a href="/menu" className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg transition-colors">
            Menyuga qaytish
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {Object.keys(cart).map(id => {
              const f = cart[id];
              if (f.amount === 0) return null;
              
              return (
                <div key={id} className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
                  {/* Rasm */}
                  <img 
                    src={f.img} 
                    alt={f.name} 
                    className="h-32 w-full object-cover mb-3 rounded-lg"
                  />
                  
                  <h3 className="font-bold text-lg mb-1 text-gray-800 text-center">{f.name}</h3>
                  
                  {/* Hacm yoki o'lcham (agar mavjud bo'lsa) */}
                  {f.volume && (
                    <p className="text-blue-600 text-sm text-center mb-2">{f.volume}</p>
                  )}
                  {f.size && (
                    <p className="text-blue-600 text-sm text-center mb-2">{f.size}</p>
                  )}
                  
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <button 
                      onClick={() => updateCount(id, "-")} 
                      className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold min-w-8 text-center">{f.amount}</span>
                    <button 
                      onClick={() => updateCount(id, "+")} 
                      className="px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <p className="text-green-700 font-semibold text-lg">
                      {(f.price * f.amount).toLocaleString()} so'm
                    </p>
                    <p className="text-gray-600">{f.kcal * f.amount} kcal</p>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(id)}
                    className="w-full mt-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    O'chirish
                  </button>
                </div>
              );
            })}
          </div>

          {/* Umumiy summa */}
          <div className="bg-gray-100 p-6 rounded-lg mb-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Umumiy hisob</h3>
            {Object.keys(cart).map(id => {
              const f = cart[id];
              if (f.amount === 0) return null;
              return (
                <div key={id} className="flex justify-between items-center mb-2">
                  <div>
                    <span>{f.name}</span>
                    {f.volume && <span className="text-sm text-gray-600 ml-2">({f.volume})</span>}
                    {f.size && <span className="text-sm text-gray-600 ml-2">({f.size})</span>}
                    <span className="text-gray-600 ml-2">x {f.amount}</span>
                  </div>
                  <span className="font-semibold">{(f.price * f.amount).toLocaleString()} so'm</span>
                </div>
              );
            })}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Jami:</span>
                <span className="text-green-700">
                  {Object.values(cart).reduce((total, item) => total + (item.price * item.amount), 0).toLocaleString()} so'm
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setReceiptOpen(true)}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              Chek olish
            </button>
            
            <button
              onClick={clearCart}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              Savatni tozalash
            </button>
          </div>
        </>
      )}

      {receiptOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">FOOD100 Chek</h2>
            <div className="bg-gray-100 p-4 rounded mb-4 max-h-96 overflow-y-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono">{getReceipt()}</pre>
            </div>
            <button
              onClick={() => setReceiptOpen(false)}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg transition-colors font-medium"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}