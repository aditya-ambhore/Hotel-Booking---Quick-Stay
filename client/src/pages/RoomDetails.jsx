import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const RoomDetails = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking Form States
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
    try {
      const res = await api.get(`/rooms/${id}`);
      setRoom(res.data.room);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (end <= start) return 0;

    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const handleBooking = async () => {
    try {
      const token = await getToken();

      const res = await api.post(
        "/bookings",
        {
          roomId: room._id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  const totalPrice =
    room && calculateNights() > 0 ? calculateNights() * room.pricePerNight : 0;

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  if (!room) {
    return <div className="text-center mt-10 text-xl">Room Not Found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <img
        src={room.images[0]}
        alt={room.roomType}
        className="w-full h-96 object-cover rounded-xl"
      />

      <div className="mt-8">
        <h1 className="text-4xl font-bold">{room.roomType}</h1>

        <p className="text-gray-500 mt-2">{room.hotel.name}</p>

        <p className="text-gray-500">{room.hotel.address}</p>

        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          {/* Left Side */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold">{room.roomType}</h1>

            <p className="text-gray-500 mt-2">{room.hotel.name}</p>

            <p className="text-gray-500">{room.hotel.address}</p>

            <h2 className="text-3xl font-bold mt-6">
              ₹ {room.pricePerNight}
              <span className="text-lg font-normal">/ night</span>
            </h2>

            <div className="mt-8">
              <h3 className="text-xl font-semibold">Amenities</h3>

              <div className="flex flex-wrap gap-3 mt-4">
                {room.amenities?.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 bg-blue-100 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="border rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>

            {/* Check In */}

            <label className="font-semibold">Check In</label>

            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 mb-4"
            />

            {/* Check Out */}

            <label className="font-semibold">Check Out</label>

            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2 mb-4"
            />

            {/* Guests */}

            <label className="font-semibold">Guests</label>

            <input
              type="number"
              min={1}
              max={room.maxGuests}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
            />

            <hr className="my-6" />

            <div className="flex justify-between mb-3">
              <span>Price / Night</span>

              <span>₹ {room.pricePerNight}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Nights</span>

              <span>{calculateNights()}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span>₹ {totalPrice}</span>
            </div>

            <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>
        </div>

        {/* Amenities */}

        <div className="mt-8">
          <h3 className="text-xl font-semibold">Amenities</h3>

          <div className="flex flex-wrap gap-3 mt-4">
            {room.amenities?.map((item) => (
              <span key={item} className="px-4 py-2 bg-blue-100 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Booking Form */}

        <div className="mt-10 bg-gray-100 rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-5">Book This Room</h3>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="block mb-2 font-medium">Check In</label>

              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Check Out</label>

              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Guests</label>

              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <p>
              <strong>Nights:</strong> {calculateNights()}
            </p>

            <p className="text-2xl font-bold text-blue-600">
              Total Price: ₹ {totalPrice}
            </p>
          </div>

          <button
            onClick={handleBooking}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
