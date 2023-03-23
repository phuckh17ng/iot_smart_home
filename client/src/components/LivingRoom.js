import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const LivingRoom = () => {
	//fetch data from adafruit server
	const AIO_KEY = 'aio_xCsl147xOTXnCvbhL2lZu9IgpEO9'; //zalo to get this key
  	const AIO_USERNAME = 'tamquattnb123';
	//latest temperature in real time
	const [DHT20Temp, setDHT20Temp] = useState(null);
	useEffect(() => {
		const intervalId = setInterval(()=> {
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
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);
	//latest humidity in real time
	const [DHT20Humi, setDHT20Humi] = useState(null);
	useEffect(() => {
		const intervalId = setInterval(() => {
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
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);
	//lastest light in real time
	const [yoloLight, setYoloLight] = useState(null);
	useEffect(() => {
		const intervalId = setInterval(()=> {
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
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<Link
			to={`/livingroom`}
			className="w-[300px] h-[400px] bg-white z-20 rounded-3xl drop-shadow-xl px-6"
		>
			<div className="flex items-end w-full mt-3">
				<img
					src={require("../img/icons8-living-room-64 (1).png")}
					alt="livingroom"
				></img>
				<span className=" text-3xl ml-6 font-bold text-zinc-800">
					Living Room
				</span>
			</div>
			<div className="mt-10">
				<div className="flex mt-6 items-end justify-between">
					<img
						src={require("../img/icons8-celsius-64 (1).png")}
						alt="livingroom"
					></img>
					<span className="text-3xl ml-6 font-bold mr-3">{DHT20Temp}</span>
				</div>
				<div className="flex mt-6 items-end justify-between">
					<img
						src={require("../img/icons8-humidity-64 (1).png")}
						alt="livingroom"
					></img>
					<span className="text-3xl ml-6 font-bold mr-3">{DHT20Humi}</span>
				</div>
				<div className="flex mt-6 items-end justify-between">
					<img
						src={require("../img/icons8-sunny-64.png")}
						alt="livingroom"
					></img>
					<span className="text-3xl ml-6 font-bold mr-3">{yoloLight}</span>
				</div>
			</div>
		</Link>
	);
};

export default LivingRoom;
