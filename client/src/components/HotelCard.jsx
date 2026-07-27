import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ hotel, index }) => {
  // Temporary random rating
  const rating = (4 + Math.random()).toFixed(1);

  return (
    <Link
      to={`/hotel/${hotel._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300"
    >
      {/* Hotel Image */}
      <div className="relative overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Badge */}
        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {index % 2 === 0 ? "Popular" : "New"}
        </span>

        {/* Wishlist */}
        <button
          type="button"
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
        >
          ❤️
        </button>
      </div>

      {/* Hotel Details */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>

          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="" className="w-4 h-4" />
            <span className="font-semibold">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-gray-500">
          <img src={assets.locationIcon} alt="" className="w-4 h-4" />

          <span className="text-sm">{hotel.address}</span>
        </div>

        <p className="mt-2 text-sm text-blue-600 font-medium">
          📍 {hotel.city}
        </p>

        <p className="mt-2 text-sm text-gray-500">📞 {hotel.contact}</p>

        <div className="mt-6 flex justify-between items-center">
          <span className="font-semibold text-green-600">
            Free Cancellation
          </span>

          <button
            type="button"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Rooms →
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
