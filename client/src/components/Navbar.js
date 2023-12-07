import React from "react";
import { FiBell, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

//Navbar
const Navbar = () => {
  return (
    <div className="py-4 w-full flex items-center justify-between px-9">
      <div>
        <div className="text-xs flex items-center">
          <div className="font-light opacity-70">Page </div>
          <div className="font-semibold">&nbsp; / &nbsp; Dashboard</div>
        </div>
        <div className="font-bold mt-1">Dashboard</div>
      </div>
      <div className="flex items-center">
        <button>
          <FiBell size={24} color="#556173" />
        </button>
        <button className="ml-6">
          <FiUser size={24} color="#556173" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
