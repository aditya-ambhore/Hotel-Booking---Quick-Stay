import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels");
      setHotels(res.data.hotels);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHotel = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/hotels/${id}`);

      setHotels((prev) => prev.filter((hotel) => hotel._id !== id));

      alert("Hotel deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete hotel");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-3xl font-bold mb-6">Hotel List</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Hotel</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {hotels.map((hotel) => (
              <tr
                key={hotel._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-24 h-16 rounded object-cover"
                  />
                </td>

                <td className="p-4 font-medium">{hotel.name}</td>

                <td className="p-4">{hotel.city}</td>

                <td className="p-4">{hotel.address}</td>

                <td className="p-4">{hotel.contact}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/owner/edit-hotel/${hotel._id}`)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteHotel(hotel._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {hotels.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No hotels found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelList;
