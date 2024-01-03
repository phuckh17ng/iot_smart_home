import React, { useEffect, useState } from "react";
import { FaCloudRain, FaFan, FaLightbulb } from "react-icons/fa";
import { GiGasStove } from "react-icons/gi";
import { IoIosTime } from "react-icons/io";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { MdAccessTime, MdLightMode } from "react-icons/md";
import { PiEngineFill } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";

import axios from "axios";
import { collection, onSnapshot, query } from "firebase/firestore";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { db } from "../firebase/config";
import {
	addTempPrediction,
	getTempPrections,
	getTempPredictions,
} from "../firebase/functions";
import { tempModelPredict } from "../ml-models/temp";
const HomeScreen = ({
	tempValue,
	humiValue,
	gasValue,
	rainValue,
	tempGraph,
	humiGraph,
	gasGraph,
	rainGraph,
	tempPredictionData,
	setTempPredictionData,
}) => {
	const currentDate = new Date();
	const [fanToggled, setFanToggled] = useState(false);
	const [ledToggled, setLedToggled] = useState(false);
	const [motorToggled, setMotorToggled] = useState(false);

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
			console.log(123123);
			const temp = [[tempValue]];
			const result = tempModelPredict(temp);
			console.log(result);
			setTempPrediction(result);
		}
	}, [tempValue]);

	console.log("result", tempPrediction);
	const fetchTempPrediction = async () => {
		const data = await getTempPredictions();
		setTempPredictionData(data);
	};

	const tempPredictions = async () => {
		if (!tempPrediction) return;
		await addTempPrediction("temperature", tempValue, tempPrediction[0]);
		await fetchTempPrediction();
	};
	useEffect(() => {
		fetchTempPrediction();
		if (!tempPrediction) return;
		if (tempPrediction[0] === 0) return;
		tempPredictions();
	}, [tempPrediction]);

	const sendToDevice = async (value) => {
		await axios
			.post(
				`https://io.adafruit.com/api/v2/huynhngoctan/feeds/dclv.moto/data`,
				{
					datum: {
						value: value,
					},
				},
				{
					headers: {
						"X-AIO-Key": "aio_muad821e5hXvt1cUymqfnHJH60Ou",
					},
				}
			)
			.then((response) => {
				// setproduct(response.data)
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleToggleMotor = async () => {
		setMotorToggled(!motorToggled);
	};

	useEffect(() => {
		if (!motorToggled) {
			sendToDevice(0);
		}
		if (motorToggled) {
			sendToDevice(1);
		}
	}, [motorToggled]);

	return (
		<div className="w-full grid grid-cols-6 gap-6 mt-3 px-6">
			<div className="col-span-1 bg-white rounded-xl px-4 py-2 flex items-center justify-between shadow-slate-200 shadow-lg">
				<div>
					<div className="text-sm opacity-70">Temperature Sensor</div>
					<div className="text-lg font-bold">{tempValue} °C</div>
				</div>
				<div className="flex items-center justify-center p-1 rounded-xl bg-[#4ec7c2]">
					<LiaTemperatureHighSolid color="#fff" size={30} />
				</div>
			</div>
			<div className="col-span-1 bg-white rounded-xl px-4 py-2 flex items-center justify-between shadow-slate-200 shadow-lg">
				<div>
					<div className="text-sm opacity-70">Humidity Sensor</div>
					<div className="text-lg font-bold">{humiValue} %</div>
				</div>
				<div className="flex items-center justify-center p-1 rounded-xl bg-[#4ec7c2]">
					<WiHumidity color="#fff" size={30} />
				</div>
			</div>
			<div className="col-span-1 bg-white rounded-xl px-4 py-2 flex items-center justify-between shadow-slate-200 shadow-lg">
				<div>
					<div className="text-sm opacity-70">Gas Sensor</div>
					<div className="text-lg font-bold">{gasValue}</div>
				</div>
				<div className="flex items-center justify-center p-1 rounded-xl bg-[#4ec7c2]">
					<GiGasStove color="#fff" size={30} />
				</div>
			</div>
			<div className="col-span-1 bg-white rounded-xl px-4 py-2 flex items-center justify-between shadow-slate-200 shadow-lg">
				<div>
					<div className="text-sm opacity-70">Rain Sensor</div>
					<div className="text-lg font-bold">{rainValue}</div>
				</div>
				<div className="flex items-center justify-center p-2 rounded-xl bg-[#4ec7c2]">
					<FaCloudRain color="#fff" size={22} />
				</div>
			</div>
			<div className="col-span-2 flex justify-end items-center">
				<div className="w-2/3 rounded-xl px-4 py-6 shadow-slate-200 bg-white/10 shadow-lg flex items-center justify-between">
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
			<div className="col-span-4 bg-white rounded-xl px-4 py-6 shadow-slate-200 shadow-lg">
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
			<div className="col-span-2 bg-white rounded-xl px-4 py-6 shadow-slate-200 shadow-lg">
				<p className="font-bold text-lg">Controller</p>
				<div className="grid grid-cols-1 gap-x-6 mt-3 px-4">
					<div className="col-span-1 w-full flex items-center justify-between border-b py-4">
						<div className="flex items-center">
							<div className="flex items-center justify-center p-2 rounded-xl bg-[#4ec7c2]">
								<FaLightbulb color="#fff" />
							</div>
							<div className="ml-4 font-semibold opacity-70">Led</div>
						</div>
						<div className="flex items-center">
							<div className="font-semibold">{ledToggled ? "On" : "Off"}</div>
							<div className="h-full ml-4">
								<label className="block__toggle--btn">
									<input
										className="td__toggle--input"
										type="checkbox"
										defaultChecked={ledToggled}
										onClick={() => setLedToggled(!ledToggled)}
									/>
									<span className="td__toggle--span" />
								</label>
							</div>
						</div>
					</div>
					<div className="col-span-1 w-full flex items-center justify-between border-b py-4">
						<div className="flex items-center">
							<div className="flex items-center justify-center p-2 rounded-xl bg-[#4ec7c2]">
								<FaFan color="#fff" />
							</div>
							<div className="ml-4 font-semibold opacity-70">Fan</div>
						</div>
						<div className="flex items-center">
							<div className="font-semibold">{fanToggled ? "On" : "Off"}</div>
							<div className="h-full ml-4">
								<label className="block__toggle--btn">
									<input
										className="td__toggle--input"
										type="checkbox"
										defaultChecked={fanToggled}
										onClick={() => setFanToggled(!fanToggled)}
									/>
									<span className="td__toggle--span" />
								</label>
							</div>
						</div>
					</div>
					<div className="col-span-1 w-full flex items-center justify-between border-b py-4">
						<div className="flex items-center">
							<div className="flex items-center justify-center p-2 rounded-xl bg-[#4ec7c2]">
								<PiEngineFill color="#fff" />
							</div>
							<div className="ml-4 font-semibold opacity-70">Motor</div>
						</div>
						<div className="flex items-center">
							<div className="font-semibold">{motorToggled ? "On" : "Off"}</div>
							<div className="h-full ml-4">
								<label className="block__toggle--btn">
									<input
										className="td__toggle--input"
										type="checkbox"
										defaultChecked={motorToggled}
										onClick={handleToggleMotor}
									/>
									<span className="td__toggle--span" />
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-span-3 bg-white rounded-xl px-4 py-6 shadow-slate-200 shadow-lg">
				<p className="font-bold text-lg">Rain Sensor Overview</p>
				<p className="text-sm ml-1 mt-1">
					<span className="opacity-70">in 24 hours</span>{" "}
					{/* <span className="font-semibold text-base">(%)</span>{" "} */}
				</p>{" "}
				<div className="mt-3 w-full grid overflow-hidden ml-[-1.5rem]">
					<BarChart width={730} height={250} data={rainGraph}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="name"
							tickSize={16}
							tickLine={false}
							fontSize={14}
						/>
						<YAxis tickSize={16} tickLine={false} fontSize={14} />
						{/* <Tooltip /> */}
						{/* <Legend /> */}
						<Bar dataKey="rain_in_living_room" fill="#8884d8" />
						<Bar dataKey="uv" fill="#82ca9d" />
					</BarChart>
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
				<p className="font-bold text-lg">Gas Overview</p>
				<p className="text-sm opacity-70 ml-1 mt-1">in 24 hours</p>
				<div className="mt-3 w-full grid overflow-hidden ml-[-1rem]">
					<AreaChart
						width={1480}
						height={250}
						data={gasGraph}
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
