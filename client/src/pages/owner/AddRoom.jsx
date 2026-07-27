import { assets, facilityIcons } from "../../assets/assets";
import api from "../../services/api";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

const AddRoom = () => {
  const { getToken } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [images, setImages] = useState([null, null, null, null]);

  const [formData, setFormData] = useState({
    hotel: "",
    roomType: "Single Bed",
    pricePerNight: "",
    isAvailable: true,
  });
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels");
      setHotels(res.data.hotels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleAmenity = (item) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("hotel", formData.hotel);
      data.append("roomType", formData.roomType);
      data.append("pricePerNight", formData.pricePerNight);
      data.append("isAvailable", formData.isAvailable);
      data.append("amenities", JSON.stringify(amenities));

      images.forEach((image) => {
        if (image) {
          data.append("images", image);
        }
      });

      const token = await getToken();

      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await api.post("/owner/rooms", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);

      // Reset form
      setImages([null, null, null, null]);
      setAmenities([]);

      setFormData({
        hotel: "",
        roomType: "Single Bed",
        pricePerNight: "",
        isAvailable: true,
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Add Room</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Images */}
        <div>
          <p className="font-medium mb-3">Room Images</p>

          <div className="flex gap-4 flex-wrap">
            {images.map((img, index) => (
              <label
                key={index}
                htmlFor={`image${index}`}
                className="cursor-pointer"
              >
                <img
                  src={img ? URL.createObjectURL(img) : assets.uploadArea}
                  className="w-28 h-28 object-cover border rounded-lg"
                  alt=""
                />

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  id={`image${index}`}
                  onChange={(e) => {
                    const newImages = [...images];
                    newImages[index] = e.target.files[0];
                    setImages(newImages);
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Select Hotel</label>

          <select
            className="border rounded-lg w-full p-3"
            value={formData.hotel}
            onChange={(e) =>
              setFormData({
                ...formData,
                hotel: e.target.value,
              })
            }
            required
          >
            <option value="">Choose Hotel</option>

            {hotels.map((hotel) => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

        {/* Room Type */}
        <div>
          <label className="block mb-2">Room Type</label>

          <select
            className="border rounded-lg w-full p-3"
            value={formData.roomType}
            onChange={(e) =>
              setFormData({
                ...formData,
                roomType: e.target.value,
              })
            }
          >
            <option>Single Bed</option>
            <option>Double Bed</option>
            <option>Deluxe Room</option>
            <option>Suite</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2">Price Per Night</label>

          <input
            type="number"
            placeholder="299"
            className="border rounded-lg w-full p-3"
            value={formData.pricePerNight}
            onChange={(e) =>
              setFormData({
                ...formData,
                pricePerNight: e.target.value,
              })
            }
          />
        </div>

        {/* Amenities */}
        <div>
          <p className="font-medium mb-4">Amenities</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(facilityIcons).map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={amenities.includes(item)}
                  onChange={() => handleAmenity(item)}
                />

                <img src={facilityIcons[item]} className="w-5" alt="" />

                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.isAvailable}
            onChange={(e) =>
              setFormData({
                ...formData,
                isAvailable: e.target.checked,
              })
            }
          />

          <span>Available</span>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Room"}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
