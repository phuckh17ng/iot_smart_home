import React, { useEffect, useState } from "react";
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./LivingRoomScreen.css";

const LivingRoomScreen = () => {
	const [isLedToggled, toggleLed] = useState(false);
	const [isAirToggled, toggleAir] = useState(false);
	const [isFanToggled, toggleFan] = useState(false);
	const [isledOn, setLed] = useState("hidden");
	const [isAirOn, setAir] = useState("hidden");
	const [isFanOn, setFan] = useState("hidden");
	useEffect(() => {
		led();
		airCondition();
		fan();
	});
	const led = () => {
		if (isLedToggled) {
			setLed("absolute z-100");
		} else {
			setLed("hidden");
		}
	};
	const airCondition = () => {
		if (isAirToggled) {
			setAir("absolute z-100");
		} else {
			setAir("hidden");
		}
	};
	const fan = () => {
		if (isFanToggled) {
			setFan("absolute z-100");
		} else {
			setFan("hidden");
		}
	};

	//fetch data from adafruit server
	const AIO_KEY = '...'; //zalo to get this key
  	const AIO_USERNAME = 'tamquattnb123';
	
	//latest temperature
	const [DHT20Temp, setDHT20Temp] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
		const FEED_NAME = 'dht20-temp';
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
			{
			headers: {
				'X-AIO-Key': AIO_KEY,
			},
			}
		);
		setDHT20Temp(result.data.value);
		};
		fetchData();
	}, []);

	//temperature line graph
	const [DHT20TempGraph, setDHT20TempGraph] = useState([]);
	useEffect(() => {
	  const FEED_NAME = 'dht20-temp';
	  axios.get(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data?limit=20`)
		.then(response => {
		  const newData = response.data.map(item => ({
			name: new Date(item.created_at).toLocaleTimeString(),
			temperature_in_living_room: item.value,
		  }));
		  setDHT20TempGraph(newData);
		})
		.catch(error => console.error(error));
	}, [DHT20TempGraph]);

	//latest humidity
	const [DHT20Humi, setDHT20Humi] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
		const FEED_NAME = 'dht20-humi';
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
			{
			headers: {
				'X-AIO-Key': AIO_KEY,
			},
			}
		);
		setDHT20Humi(result.data.value);
		};
		fetchData();
	}, []);

	//humidity graph
	const [DHT20HumiGraph, setDHT20HumiGraph] = useState([]);
	useEffect(() => {
	  const FEED_NAME = 'dht20-humi';
	  axios.get(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data?limit=20`)
		.then(response => {
		  const newData = response.data.map(item => ({
			name: new Date(item.created_at).toLocaleTimeString(),
			humidity_in_living_room: item.value,
		  }));
		  setDHT20HumiGraph(newData);
		})
		.catch(error => console.error(error));
	}, [DHT20HumiGraph]);

	//lastest light
	const [yoloLight, setYoloLight] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
		const FEED_NAME = 'yolo-light';
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
			{
			headers: {
				'X-AIO-Key': AIO_KEY,
			},
			}
		);
		setYoloLight(result.data.value);
		};
		fetchData();
	}, []);

	//light graph
	const [lightGraph, setLightGraph] = useState([]);
	useEffect(() => {
	  const FEED_NAME = 'yolo-light';
	  axios.get(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data?limit=20`)
		.then(response => {
		  const newData = response.data.map(item => ({
			name: new Date(item.created_at).toLocaleTimeString(),
			light_in_living_room: item.value,
		  }));
		  setLightGraph(newData);
		})
		.catch(error => console.error(error));
	}, [lightGraph]);

	return (
		<div className="w-full h-[100%] bg-slate-200">
			<div className="w-full pt-16">
				<div className="w-[90%] h-full bg-white z-20 rounded-3xl drop-shadow-xl px-6 mx-auto">
					<div className="flex items-end w-full pt-3">
						<img
							src={require("../img/icons8-living-room-64 (1).png")}
							alt="livingroom"
						></img>
						<span className="text-3xl ml-6 font-bold text-zinc-800">
							Living Room
						</span>
					</div>
					
					<div className="mt-10">
						<div className="flex items-end w-full pt-3">
							<img
								src={require("../img/icons8-celsius-64 (1).png")}
								alt="livingroom"
							></img>
							{/* <span className="text-3xl ml-6 font-bold mr-3">30</span> */}
							<div className="text-xl ml-6 font-bold text-zinc-800">
								{DHT20Temp ? (
								<p>The current temperature is <span style={{color: 'blue', fontWeight: "600"}}>{DHT20Temp}</span> degrees Celsius</p>
								) : (
								<p>Loading temperature data...</p>
								)}
							</div>
						</div>

						<div className="mt-5 w-full grid">
							<LineChart className="place-self-center w-full" 
							width={800}
							height={400}
							data={DHT20TempGraph}
							>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name"/>
							<YAxis unit={"°C"}/>
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="temperature_in_living_room" stroke="#8884d8" activeDot={{ r: `10` }} />
							</LineChart>
						</div>
						
						<div className="flex items-end w-full pt-3">
							<img
								src={require("../img/icons8-humidity-64 (1).png")}
								alt="livingroom"
							></img>
							{/* <span className="text-3xl ml-6 font-bold mr-3">30</span> */}
							<div className="text-xl ml-6 font-bold text-zinc-800">
								{DHT20Humi ? (
								<p>The current humidity is <span style={{color: 'blue', fontWeight: "600"}}>{DHT20Humi}</span> %</p>
								) : (
								<p>Loading humidity data...</p>
								)}
							</div>
						</div>

						<div className="mt-5 w-full grid">
							<LineChart className="place-self-center w-full" 
							width={800}
							height={400}
							data={DHT20HumiGraph}
							>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name"/>
							<YAxis unit={"°%"}/>
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="humidity_in_living_room" stroke="#8884d8" activeDot={{ r: `10` }} />
							</LineChart>
						</div>

						<div className="flex items-end w-full pt-3">
							<img
								src={require("../img/icons8-sunny-64.png")}
								alt="livingroom"
							></img>
							{/* <span className="text-3xl ml-6 font-bold mr-3">30</span> */}
							<div className="text-xl ml-6 font-bold text-zinc-800">
								{yoloLight ? (
								<p>The current light is <span style={{color: 'blue', fontWeight: "600"}}>{yoloLight}</span> %</p>
								) : (
								<p>Loading light data...</p>
								)}
							</div>
						</div>

						<div className="mt-5 w-full grid">
							<LineChart className="place-self-center w-full" 
							width={800}
							height={400}
							data={lightGraph}
							>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name"/>
							<YAxis unit={"°%"}/>
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="light_in_living_room" stroke="#8884d8" activeDot={{ r: `10` }} />
							</LineChart>
						</div>
					</div>

					<div className="flex pb-12">
						<div className="w-[250px] h-[130px] bg-white z-20 rounded-3xl shadow-[0px_3px_6px_rgba(0,0,0,0.16),0px_3px_6px_rgba(0,0,0,0.23)] px-6 mx-auto">
							<div className="w-full text-center text-2xl py-4">
								Air Conditioner
							</div>
							<div className="flex items-center justify-between w-full">
								<div className="w-full h-full flex items-center justify-start mt-4">
									<img
										src={require("../img/icons8-air-conditioner-72 (1).png")}
										alt="airconditioner_off"
										className="absolute z-0 w-[64px] h-[64px]"
									></img>
									<img
										src={require("../img/icons8-air-conditioner-72.png")}
										alt="aircond itioner_on"
										className={`${isAirOn} w-[64px] h-[64px]`}
									></img>
								</div>
								<div className="h-full">
									<label className="block__toggle--btn">
										<input
											className="td__toggle--input"
											type="checkbox"
											defaultChecked={isAirToggled}
											onClick={() => toggleAir(!isAirToggled)}
										/>
										<span className="td__toggle--span" />
										{/* <strong className="td__toggle--strong">Led</strong> */}
									</label>
								</div>
							</div>
						</div>
						<div className="w-[250px] h-[130px] bg-white z-20 rounded-3xl shadow-[0px_3px_6px_rgba(0,0,0,0.16),0px_3px_6px_rgba(0,0,0,0.23)] px-6 mx-auto">
							<div className="w-full text-center text-2xl py-4">Led</div>
							<div className="flex items-center justify-between w-full">
								<div className="w-full h-full flex items-center justify-start mt-4">
									<img
										src={require("../img/icons8-pendant-light-72.png")}
										alt="airconditioner_off"
										className="absolute z-0 w-[64px] h-[64px]"
									></img>
									<img
										src={require("../img/icons8-pendant-light-72 (1).png")}
										alt="aircond itioner_on"
										className={`${isledOn} w-[64px] h-[64px]`}
									></img>
								</div>
								<div className="h-full">
									<label className="block__toggle--btn">
										<input
											className="td__toggle--input"
											type="checkbox"
											defaultChecked={isLedToggled}
											onClick={() => toggleLed(!isLedToggled)}
										/>
										<span className="td__toggle--span" />
										{/* <strong className="td__toggle--strong">Led</strong> */}
									</label>
								</div>
							</div>
						</div>
						<div className="w-[250px] h-[130px] bg-white z-20 rounded-3xl shadow-[0px_3px_6px_rgba(0,0,0,0.16),0px_3px_6px_rgba(0,0,0,0.23)] px-6 mx-auto">
							<div className="w-full text-center text-2xl py-4">Fan</div>
							<div className="flex items-center justify-between w-full">
								<div className="w-full h-full flex items-center justify-start mt-4">
									<img
										src={require("../img/icons8-fan-64 (1).png")}
										alt="airconditioner_off"
										className="absolute z-0 w-[64px] h-[64px]"
									></img>
									<img
										src={require("../img/icons8-fan-64.png")}
										alt="aircond itioner_on"
										className={`${isFanOn} w-[64px] h-[64px]`}
									></img>
								</div>
								<div className="h-full">
									<label className="block__toggle--btn">
										<input
											className="td__toggle--input"
											type="checkbox"
											defaultChecked={isFanToggled}
											onClick={() => toggleFan(!isFanToggled)}
										/>
										<span className="td__toggle--span" />
										{/* <strong className="td__toggle--strong">Led</strong> */}
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LivingRoomScreen;
