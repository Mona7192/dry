export default function Hero() {
  return (
    <section className="bg-accent py-16 px-6 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        Premium <span className="text-primary">Laundry & Duvet Cleaning</span>
      </h1>
      <p className="text-xl text-primary font-semibold mb-2">
        Free Collection & Delivery
      </p>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Enjoy the ultimate convenience – we collect, clean, and deliver straight to your door.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-primary text-white px-6 py-2 rounded-full">Book Now</button>
        <button className="bg-white border border-primary text-primary px-6 py-2 rounded-full">
          Pricing Section
        </button>
      </div>
    </section>
  );
}
