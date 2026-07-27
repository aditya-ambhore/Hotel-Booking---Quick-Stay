import React from "react";

const stats = [
  {
    number: "500+",
    title: "Luxury Hotels",
  },
  {
    number: "50+",
    title: "Cities",
  },
  {
    number: "20K+",
    title: "Happy Guests",
  },
  {
    number: "4.9★",
    title: "Average Rating",
  },
];

const Stats = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 text-center border"
            >
              <h2 className="text-4xl font-bold text-blue-600">
                {item.number}
              </h2>

              <p className="mt-3 text-gray-600 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
