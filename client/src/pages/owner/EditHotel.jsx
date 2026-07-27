import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    address: "",
    contact: "",
    description: "",
  });

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      const res = await api.get(`/hotels/${id}`);

      setHotel({
        name: res.data.hotel.name,
        city: res.data.hotel.city,
        address: res.data.hotel.address,
        contact: res.data.hotel.contact,
        description: res.data.hotel.description,
      });
    } catch (error) {
      console.log(error);
      alert("Unable to fetch hotel");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setHotel({
      ...hotel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/hotels/${id}`, hotel);

      alert("Hotel updated successfully");

      navigate("/owner/hotels");
    } catch (error) {
      console.log(error);
      alert("Failed to update hotel");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Hotel</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-medium">Hotel Name</label>

          <input
            type="text"
            name="name"
            value={hotel.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="font-medium">City</label>

          <input
            type="text"
            name="city"
            value={hotel.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="font-medium">Address</label>

          <input
            type="text"
            name="address"
            value={hotel.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="font-medium">Contact</label>

          <input
            type="text"
            name="contact"
            value={hotel.contact}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="font-medium">Description</label>

          <textarea
            rows="5"
            name="description"
            value={hotel.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Update Hotel
        </button>
      </form>
    </div>
  );
};

export default EditHotel;
