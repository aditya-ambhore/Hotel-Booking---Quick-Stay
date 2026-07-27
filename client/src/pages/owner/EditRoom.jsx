import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomType: "",
    pricePerNight: "",
    isAvailable: true,
    images: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const res = await api.get(`/owner/rooms/${id}`);
      setRoom(res.data.room);
    } catch (error) {
      console.log(error);
      alert("Failed to load room");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/owner/rooms/${id}`, {
        roomType: room.roomType,
        pricePerNight: room.pricePerNight,
        isAvailable: room.isAvailable,
      });

      alert("Room Updated Successfully");

      // Go back to Room List
      navigate("/owner/rooms");
    } catch (error) {
      console.log(error);
      alert("Failed to update room");
    }
  };

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading Room...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Room</h1>

      <div className="space-y-5">
        {/* Room Type */}
        <div>
          <label className="block mb-2 font-medium">Room Type</label>

          <input
            type="text"
            value={room.roomType}
            onChange={(e) =>
              setRoom({
                ...room,
                roomType: e.target.value,
              })
            }
            className="border rounded-lg p-3 w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price Per Night</label>

          <input
            type="number"
            value={room.pricePerNight}
            onChange={(e) =>
              setRoom({
                ...room,
                pricePerNight: e.target.value,
              })
            }
            className="border rounded-lg p-3 w-full"
          />
        </div>

        {/* Availability */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={room.isAvailable}
            onChange={(e) =>
              setRoom({
                ...room,
                isAvailable: e.target.checked,
              })
            }
          />

          <span>Available</span>
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Update Room
        </button>
      </div>
    </div>
  );
};

export default EditRoom;
