import React, { useState } from "react";
import { useAuth } from "@clerk/react";
import api from "../../services/api";
import { assets } from "../../assets/assets";

const AddHotel = () => {
  const { getToken } = useAuth();

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    contact: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = await getToken();
      console.log("TOKEN:", token);

      const data = new FormData();

      data.append("image", image);
      data.append("name", formData.name);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("contact", formData.contact);
      data.append("description", formData.description);

      const res = await api.post("/owner/hotel", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);

      setImage(null);

      setFormData({
        name: "",
        address: "",
        city: "",
        contact: "",
        description: "",
      });
    } catch (error) {
      console.log("============= ADD HOTEL ERROR =============");
      console.error(error);
      console.error(error.response?.data);
      console.error(error.message);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Add Hotel</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hotel Image */}

        <div>
          <label className="font-medium block mb-2">Hotel Image</label>

          <label htmlFor="hotelImage" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.uploadArea}
              className="w-40 border rounded-lg"
              alt=""
            />

            <input
              hidden
              id="hotelImage"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* Hotel Name */}

        <div>
          <label className="block mb-2">Hotel Name</label>

          <input
            className="border rounded-lg w-full p-3"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>

        {/* Address */}

        <div>
          <label className="block mb-2">Address</label>

          <input
            className="border rounded-lg w-full p-3"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
          />
        </div>

        {/* City */}

        <div>
          <label className="block mb-2">City</label>

          <input
            className="border rounded-lg w-full p-3"
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
          />
        </div>

        {/* Contact */}

        <div>
          <label className="block mb-2">Contact</label>

          <input
            className="border rounded-lg w-full p-3"
            value={formData.contact}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: e.target.value,
              })
            }
          />
        </div>

        {/* Description */}

        <div>
          <label className="block mb-2">Description</label>

          <textarea
            rows="5"
            className="border rounded-lg w-full p-3"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Add Hotel"}
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
