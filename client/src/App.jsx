import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Experience from "./pages/Experience";
import About from "./pages/About";
import RoomDetails from "./pages/RoomDetails";
import HotelDetails from "./pages/HotelDetails";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";

import OwnerLayout from "./pages/owner/OwnerLayout";
import Dashboard from "./pages/owner/Dashboard";
import AddHotel from "./pages/owner/AddHotel";
import HotelList from "./pages/owner/HotelList";
import AddRoom from "./pages/owner/AddRoom";
import RoomList from "./pages/owner/RoomList";
import Bookings from "./pages/owner/Bookings";
import EditRoom from "./pages/owner/EditRoom";
import EditHotel from "./pages/owner/EditHotel"


const App = () => {
  const isOwnerPath = useLocation().pathname.includes("/owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}

      <div className="min-h-[70vh]">
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/booking/:roomId" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          {/* Owner Routes */}
          <Route path="/owner" element={<OwnerLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-hotel" element={<AddHotel />} />
            <Route path="hotels" element={<HotelList />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="rooms" element={<RoomList />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="edit-room/:id" element={<EditRoom />} />
            <Route path="edit-hotel/:id" element={<EditHotel />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
