import React from "react";
import { assets } from "../assets/assets";

const features = [
  {
    icon: assets.starIconFilled,
    title: "Premium Hotels",
    desc: "Handpicked luxury hotels with exceptional comfort.",
  },
  {
    icon: assets.locationIcon,
    title: "Best Locations",
    desc: "Stay in prime destinations close to attractions.",
  },
  {
    icon: assets.calenderIcon,
    title: "Easy Booking",
    desc: "Book your stay within minutes with a simple process.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <h2 className="text-4xl font-bold text-center">Why Choose Us</h2>

        <p className="text-gray-500 text-center mt-3 max-w-2xl mx-auto">
          We provide premium hotels, secure bookings, and unforgettable travel
          experiences.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-8 text-center"
            >
              <img src={item.icon} alt="" className="w-12 mx-auto" />

              <h3 className="text-xl font-semibold mt-5">{item.title}</h3>

              <p className="text-gray-500 mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
