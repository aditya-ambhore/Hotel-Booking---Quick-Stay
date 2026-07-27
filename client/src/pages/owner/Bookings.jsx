import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "@clerk/react";

const Bookings = () => {
  const { getToken } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = await getToken();

      const res = await api.get("/owner/bookings", {
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

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <h2 className="text-center text-2xl mt-10">Loading Bookings...</h2>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-3xl font-bold mb-6">All Bookings</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Guest</th>
              <th className="p-4 text-left">Room</th>
              <th className="p-4 text-left">Check In</th>
              <th className="p-4 text-left">Check Out</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{booking.user?.name}</td>

                <td className="p-4">{booking.room?.roomType}</td>

                <td className="p-4">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </td>

                <td className="p-4">${booking.totalPrice}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
