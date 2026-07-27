import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/owner/Sidebar";

const OwnerLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          ← Back to Home
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default OwnerLayout;
