import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const HotelDetails = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      const res = await api.get(`/hotels/${id}`);
      setHotel(res.data.hotel);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  if (!hotel) {
    return <div className="text-center mt-20 text-xl">Hotel Not Found</div>;
  }

  return (
    <div className="pt-24 md:pt-28 px-6 md:px-16 lg:px-24 pb-10">
      {/* Hero Image */}
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover rounded-3xl"
      />

      {/* Hotel Name */}
      <div className="flex justify-between items-center mt-8">
        <div>
          <h1 className="text-4xl font-bold">{hotel.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <img src={assets.locationIcon} alt="" className="w-5" />

            <span>{hotel.address}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-yellow-500 font-bold text-lg">⭐ 4.8</p>

          <p className="text-gray-500">Excellent</p>
        </div>
      </div>

      {/* Description */}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-3">About Hotel</h2>

        <p className="text-gray-600 leading-8">{hotel.description}</p>
      </div>

      {/* Contact */}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>

        <p>📞 {hotel.contact}</p>

        <p>📍 {hotel.city}</p>
      </div>

      {/* Hotel Amenities */}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Hotel Amenities</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border rounded-xl p-4 text-center">📶 Free WiFi</div>

          <div className="border rounded-xl p-4 text-center">
            🏊 Swimming Pool
          </div>

          <div className="border rounded-xl p-4 text-center">🍽 Restaurant</div>

          <div className="border rounded-xl p-4 text-center">🚗 Parking</div>
        </div>
      </div>

      {/* Rooms */}

      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-8">Available Rooms</h2>

        {hotel.rooms.length === 0 ? (
          <div className="bg-gray-100 p-10 rounded-xl text-center">
            No rooms available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotel.rooms.map((room) => (
              <div
                key={room._id}
                className="border rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
              >
                {/* Room Image */}

                <img
                  src={room.images?.[0] || hotel.image}
                  alt={room.roomType}
                  className="w-full h-60 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-2xl font-bold">{room.roomType}</h3>

                  <p className="text-blue-600 font-semibold mt-2">
                    ₹{room.pricePerNight} / Night
                  </p>

                  {/* Amenities */}

                  <div className="flex flex-wrap gap-2 mt-4">
                    {room.amenities?.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Availability */}

                  <div className="mt-6">
                    {room.isAvailable ? (
                      <button
                        onClick={() => navigate(`/booking/${room._id}`)}
                        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                      >
                        Book Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-400 text-white py-3 rounded-xl cursor-not-allowed"
                      >
                        Not Available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
