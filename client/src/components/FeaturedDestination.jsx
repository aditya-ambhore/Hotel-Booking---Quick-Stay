import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import HotelCard from "./HotelCard";
import Title from "./Title";

const FeaturedDestination = () => {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels");
      setHotels(res.data.hotels.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Featured Hotels"
        subTitle="Discover handpicked luxury hotels across India's most beautiful destinations."
      />
      <div className="flex flex-wrap justify-center gap-6 mt-16">
        {hotels.map((hotel, index) => (
          <HotelCard key={hotel._id} hotel={hotel} index={index} />
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/hotels");
          window.scrollTo(0, 0);
        }}
        className="mt-16 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        View All Hotels
      </button>
    </div>
  );
};

export default FeaturedDestination;
