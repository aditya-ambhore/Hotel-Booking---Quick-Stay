import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "@clerk/react";

const MyBookings = () => {
  const { getToken } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = await getToken();

      const res = await api.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) return;

    try {
      const token = await getToken();

      const res = await api.put(
        `/bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);

      fetchBookings();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-10">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No bookings found.
        </div>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-2xl shadow-lg overflow-hidden md:flex"
            >
              <img
                src={booking.hotel.image}
                alt=""
                className="w-full md:w-80 h-64 object-cover"
              />

              <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold">{booking.hotel.name}</h2>

                <p className="mt-2 text-gray-600">{booking.hotel.address}</p>

                <p className="mt-3">
                  <strong>Room :</strong> {booking.room.roomType}
                </p>

                <p>
                  <strong>Guests :</strong> {booking.guests}
                </p>

                <p>
                  <strong>Check In :</strong>{" "}
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>Check Out :</strong>{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>

                <p className="mt-2 text-blue-600 font-bold text-xl">
                  ₹{booking.totalPrice}
                </p>

                <div className="mt-3">
                  <span
                    className={`px-4 py-1 rounded-full text-white ${
                      booking.status === "Confirmed"
                        ? "bg-green-600"
                        : booking.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {booking.status !== "Cancelled" && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
