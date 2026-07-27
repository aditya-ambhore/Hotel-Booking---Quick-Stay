import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import api from "../../services/api";
import { useAuth } from "@clerk/react";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: [],
  });

  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = await getToken();

        const res = await api.get("/owner/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboard(res.data.dashboard);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Destructure the data here (outside useEffect)
  const { totalBookings, totalRevenue, bookings } = dashboard;

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">Loading Dashboard...</div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-5">
          <img
            src={assets.totalBookingIcon}
            className="w-14"
            alt="Total Bookings"
          />

          <div>
            <p className="text-3xl font-bold">{totalBookings}</p>
            <p className="text-gray-500">Total Bookings</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-5">
          <img
            src={assets.totalRevenueIcon}
            className="w-14"
            alt="Total Revenue"
          />

          <div>
            <p className="text-3xl font-bold">${totalRevenue}</p>
            <p className="text-gray-500">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow mt-10">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Guest</th>
              <th className="p-4">Hotel</th>
              <th className="p-4">Room</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="border-b">
                  <td className="p-4">
                    {booking.user?.username || booking.user?.name}
                  </td>

                  <td className="p-4">{booking.hotel?.name}</td>

                  <td className="p-4">{booking.room?.roomType}</td>

                  <td className="p-4">${booking.totalPrice}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
