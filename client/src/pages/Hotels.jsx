import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import HotelCard from "../components/HotelCard";
import { useSearchParams } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCity, setSelectedCity] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [searchParams] = useSearchParams();

  const city = searchParams.get("city");
  const guests = searchParams.get("guests"); // For future use

  useEffect(() => {
    fetchHotels();
  }, [city]);

  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels");

      let filteredHotels = res.data.hotels;

      if (city) {
        filteredHotels = filteredHotels.filter((hotel) =>
          hotel.city.toLowerCase().includes(city.toLowerCase()),
        );
      }

      setHotels(filteredHotels);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const displayedHotels = useMemo(() => {
    let filtered = [...hotels];

    if (selectedCity !== "All") {
      filtered = filtered.filter((hotel) => hotel.city === selectedCity);
    }

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "city") {
      filtered.sort((a, b) => a.city.localeCompare(b.city));
    }

    return filtered;
  }, [hotels, selectedCity, sortBy]);

  const uniqueCities = ["All", ...new Set(hotels.map((hotel) => hotel.city))];

  if (loading) {
    return (
      <div className="px-6 md:px-16 lg:px-24 pt-28 py-10">
        <h1 className="text-3xl font-bold mb-8">Our Hotels</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[420px] rounded-xl bg-gray-200 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 pt-28 py-10">
      <h1 className="text-3xl font-bold mb-2">Our Hotels</h1>

      {city && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Hotels in <span className="text-blue-600">{city}</span>
          </h2>

          <p className="text-gray-500">
            {displayedHotels.length} Hotel
            {displayedHotels.length !== 1 ? "s" : ""} Found
          </p>
        </div>
      )}

      {!city && (
        <p className="text-gray-500 mb-8">
          {displayedHotels.length} Hotels Available
        </p>
      )}

      {/* Filter & Sort */}

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <label className="font-medium">Filter by City</label>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none"
          >
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="font-medium">Sort By</label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none"
          >
            <option value="default">Default</option>
            <option value="name">Hotel Name (A-Z)</option>
            <option value="city">City</option>
          </select>
        </div>
      </div>

      {displayedHotels.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">No hotels found</h2>

          <p className="text-gray-500 mt-2">Try another city.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedHotels.map((hotel, index) => (
            <HotelCard key={hotel._id} hotel={hotel} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels;
