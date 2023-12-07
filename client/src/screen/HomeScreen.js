import React, { useEffect, useState } from "react";
import { IoIosTime } from "react-icons/io";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { MdAccessTime, MdLightMode } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { tempModelPredict } from "../ml-models/temp";
const HomeScreen = ({
  tempValue,
  humiValue,
  lightValue,
  tempGraph,
  humiGraph,
  lightGraph,
}) => {
  const currentDate = new Date();

  const [currentTime, setCurrentTime] = useState(
    currentDate.getHours() + " : " + currentDate.getMinutes()
  );
  useEffect(() => {
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    var time = hours + " : " + minutes;
    const intervalId = setInterval(() => {
      setCurrentTime(time);
    }, [36000]);
    return () => clearInterval(intervalId);
  });

  const [tempPrediction, setTempPrediction] = useState();
  useEffect(() => {
    if (tempValue) {
      const temp = [[100]];
      const result = tempModelPredict(temp);
      setTempPrediction(result);
    }
  }, [tempValue]);

  console.log("result", tempPrediction);
  return (
    <div className="w-full grid grid-cols-6 gap-6 mt-3 px-6">
      <div className="col-span-1 bg-white rounded-xl px-4 py-2 flex items-center justify-between shadow-slate-200 shadow-lg">
        <div>
          <div className="text-sm opacity-70">Temperature</div>
          <div className="text-lg font-bold">{tempValue} °C</div>
        </div>
        <div className="flex items-center justify-center p-1 rounded-xl bg-[#4ec7c2]">
          <LiaTemperatureHighSolid color="#fff" size={30} />
        </div>
      </div>
      <div className="col-span-1 bg-white rounded-xl px-4 py-2 flex items-center justify-between shadow-slate-200 shadow-lg">
        <div>
          <div className="text-sm opacity-70">Humidity</div>
          <div className="text-lg font-bold">{humiValue} %</div>
        </div>
        <div className="flex items-center justify-center p-1 rounded-xl bg-[#4ec7c2]">
          <WiHumidity color="#fff" size={30} />
        </div>
      </div>
      <div className="col-span-1 bg-white rounded-xl px-4 py-2 flex items-center justify-between shadow-slate-200 shadow-lg">
        <div>
          <div className="text-sm opacity-70">Light</div>
          <div className="text-lg font-bold">{lightValue}</div>
        </div>
        <div className="flex items-center justify-center p-1 rounded-xl bg-[#4ec7c2]">
          <MdLightMode color="#fff" size={30} />
        </div>
      </div>
      <div className="col-span-3 flex justify-end items-center">
        <div className="w-1/2 rounded-xl px-4 py-6 shadow-slate-200 bg-white/10 shadow-lg flex items-center justify-between">
          <div className="font-semibold opacity-50 text-sm">
            {currentDate.toDateString()}
          </div>
          <div className="flex items-center font-semibold">
            <p>{currentTime}</p>
            <div className="ml-2 opacity-60">
              <MdAccessTime size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 bg-white rounded-xl px-4 py-6 shadow-slate-200 shadow-lg">
        <p className="font-bold text-lg">Temperature Overview</p>
        <p className="text-sm ml-1 mt-1">
          <span className="opacity-70">in 24 hours</span>{" "}
          <span className="font-semibold text-base">(°C)</span>{" "}
        </p>
        <div className="mt-6 w-full grid overflow-hidden ml-[-1.5rem]">
          <AreaChart
            width={1480}
            height={250}
            data={tempGraph}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ec7c2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4ec7c2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickSize={16}
              tickLine={false}
              fontSize={14}
            />
            <YAxis tickSize={16} tickLine={false} fontSize={14} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="temperature_in_living_room"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="temperature_in_living_room"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
      </div>
      <div className="col-span-3 bg-white rounded-xl px-4 py-6 shadow-slate-200 shadow-lg">
        <p className="font-bold text-lg">Humidity Overview</p>
        <p className="text-sm ml-1 mt-1">
          <span className="opacity-70">in 24 hours</span>{" "}
          <span className="font-semibold text-base">(%)</span>{" "}
        </p>{" "}
        <div className="mt-3 w-full grid overflow-hidden ml-[-1.5rem]">
          <AreaChart
            width={1480}
            height={250}
            data={humiGraph}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ec7c2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4ec7c2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickSize={16}
              tickLine={false}
              fontSize={14}
            />
            <YAxis tickSize={16} tickLine={false} fontSize={14} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="humidity_in_living_room"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="humidity_in_living_room"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
      </div>
      <div className="col-span-3 bg-white rounded-xl px-4 py-6 shadow-slate-200 shadow-lg">
        <p className="font-bold text-lg">Light Overview</p>
        <p className="text-sm opacity-70 ml-1 mt-1">in 24 hours</p>
        <div className="mt-3 w-full grid overflow-hidden ml-[-1rem]">
          <AreaChart
            width={1480}
            height={250}
            data={lightGraph}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ec7c2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4ec7c2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickSize={16}
              tickLine={false}
              fontSize={14}
            />
            <YAxis tickSize={16} tickLine={false} fontSize={14} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="light_in_living_room"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="light_in_living_room"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
