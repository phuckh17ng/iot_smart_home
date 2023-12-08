import React, { useState } from "react";
import { FiHome, FiTrello } from "react-icons/fi";
import NotificationCard from "./NotificationCard";

const Sidebar = ({ tempPredictionData }) => {
  const sidebar = [
    {
      icon: (index) => {
        return (
          <FiTrello size={18} color={active === index ? "#fff" : "#4ec7c2"} />
        );
      },
      label: "Dashboard",
    },
    {
      icon: (index) => {
        return (
          <FiHome size={18} color={active === index ? "#fff" : "#4ec7c2"} />
        );
      },
      label: "Living Room",
    },
    {
      icon: (index) => {
        return (
          <FiHome size={18} color={active === index ? "#fff" : "#4ec7c2"} />
        );
      },
      label: "Kitchen",
    },
    {
      icon: (index) => {
        return (
          <FiHome size={18} color={active === index ? "#fff" : "#4ec7c2"} />
        );
      },
      label: "Bed Room",
    },
  ];

  const [active, setActive] = useState(0);
  return (
    <div className="w-64 max-w-[16rem] h-full min-h-screen px-6">
      <p className="text-lg text-center py-6 border-b font-bold opacity-90">
        IOT SMART HOME
      </p>

      <div className="mt-3">
        {sidebar.map((value, index) => {
          return (
            <button
              key={index}
              className={`flex items-center px-4 py-3 rounded-xl w-full ${
                active === index
                  ? "bg-white shadow-slate-200 shadow-lg"
                  : "opacity-60"
              }`}
              onClick={() => setActive(index)}
            >
              <div
                className={`rounded-[14px] w-8 h-8 flex items-center justify-center ${
                  active === index ? "bg-[#4ec7c2]" : "bg-white"
                }`}
              >
                {value.icon(index)}
              </div>
              <p className="ml-3 font-semibold">{value.label}</p>
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-white">
        {tempPredictionData
          ?.sort((a, b) => b.prediction - a.prediction)
          ?.map((item, index) => {
            return <NotificationCard key={index} data={item} />;
          })}
      </div>
    </div>
  );
};

export default Sidebar;
