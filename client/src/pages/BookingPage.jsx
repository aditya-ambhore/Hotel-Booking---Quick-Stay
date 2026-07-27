import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import api from "../services/api";

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [room, setRoom] = useState(null);

  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchRoom();
  }, []);

  useEffect(() => {
    calculatePrice();
  }, [formData.checkInDate, formData.checkOutDate]);

  const fetchRoom = async () => {
    try {
      const res = await api.get(`/rooms/${roomId}`);
      setRoom(res.data.room);
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePrice = () => {
    if (!room) return;

    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);

      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

      if (nights > 0) {
        setTotalPrice(nights * room.pricePerNight);
      } else {
        setTotalPrice(0);
      }
    }
  };

  const handleBooking = async () => {
    try {
      const token = await getToken();

      const res = await api.post(
        "/bookings",
        {
          roomId,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          guests: formData.guests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);

      navigate("/my-bookings");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  if (!room) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={room.images[0]}
            alt=""
            className="rounded-xl w-full h-96 object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{room.hotel.name}</h1>

          <p className="text-xl mt-3">{room.roomType}</p>

          <p className="text-blue-600 text-2xl font-bold mt-4">
            ₹{room.pricePerNight} / Night
          </p>

          <div className="mt-8">
            <label className="font-medium">Check In</label>

            <input
              type="date"
              className="border p-3 rounded-lg w-full mt-2"
              value={formData.checkInDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  checkInDate: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-5">
            <label className="font-medium">Check Out</label>

            <input
              type="date"
              className="border p-3 rounded-lg w-full mt-2"
              value={formData.checkOutDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  checkOutDate: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-5">
            <label className="font-medium">Guests</label>

            <input
              type="number"
              min="1"
              className="border p-3 rounded-lg w-full mt-2"
              value={formData.guests}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  guests: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-8 text-2xl font-bold">
            Total Price : ₹{totalPrice}
          </div>

          <button
            onClick={handleBooking}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
