import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const RoomList = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const token = await getToken();

      const res = await api.get("/owner/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRooms(res.data.rooms);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const deleteRoom = async (id) => {
    try {
      const token = await getToken();

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this room?",
      );

      if (!confirmDelete) return;

      await api.delete(`/owner/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Room Deleted Successfully");

      fetchRooms();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading Rooms...</h2>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-3xl font-bold mb-6">Room List</h1>

      {rooms.length === 0 ? (
        <p>No Rooms Found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Room Type</th>
                <th className="p-4 text-left">Hotel</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Availability</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={room.images?.[0]}
                      alt=""
                      className="w-20 h-16 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-4">{room.roomType}</td>

                  <td className="p-4">{room.hotel?.name}</td>

                  <td className="p-4">${room.pricePerNight}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        room.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {room.isAvailable ? "Available" : "Booked"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => navigate(`/owner/edit-room/${room._id}`)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteRoom(room._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoomList;
