import burgerImage from "../assets/burger.jpg";

export default function Hero() {
  return (
    <section className="h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-white relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${burgerImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold mb-4">FOOD100</h1>
        <p className="text-2xl">FAST FOOD 100 LEVEL</p>
        <div className="mt-6">
          <a 
            href="/menu" 
            className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Buyurtma berish
          </a>
        </div>
      </div>
    </section>
  );
}