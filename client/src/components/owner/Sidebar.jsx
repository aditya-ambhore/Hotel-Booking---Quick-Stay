import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: assets.dashboardIcon,
    },
    {
      name: "Add Hotel",
      path: "/owner/add-hotel",
      icon: assets.addIcon,
    },
    {
      name: "Hotel List",
      path: "/owner/hotels",
      icon: assets.listIcon,
    },
    {
      name: "Add Room",
      path: "/owner/add-room",
      icon: assets.addIcon,
    },
    {
      name: "Room List",
      path: "/owner/rooms",
      icon: assets.listIcon,
    },
    {
      name: "Bookings",
      path: "/owner/bookings",
      icon: assets.totalBookingIcon,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r">
      <div className="p-6 border-b">
        <img src={assets.logo} className="h-9" alt="" />
      </div>

      <div className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/owner"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <img src={item.icon} alt="" className="w-5 h-5 " />

            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
