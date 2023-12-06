import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import axios from "axios";
import { useEffect, useState } from "react";
import BedRoomScreen from "./screen/BedRoomScreen";
import HomeScreen from "./screen/HomeScreen";
import KitchenScreen from "./screen/KitchenScreen";
import LivingRoomScreen from "./screen/LivingRoomScreen";
function App() {
	//fetch data from adafruit server
	const AIO_KEY = "aio_PTVY87SqoqmxFDcTof9yZKv2pa3F"; //zalo to get this key
	const AIO_USERNAME = "huynhngoctan";
	//latest temperature in real time
	const [temp, setTemp] = useState(null);
	const [humi, setHumi] = useState(null);
	const [light, setLight] = useState(null);

	const fetchTempData = async () => {
		const FEED_NAME = "dclv.kitchen-temp";
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
			{
				headers: {
					"X-AIO-Key": AIO_KEY,
				},
			}
		);
		console.log(result);
		setTemp(result.data.value);
	};

	const fetchHumiData = async () => {
		const FEED_NAME = "dclv.kitchen-humi";
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
			{
				headers: {
					"X-AIO-Key": AIO_KEY,
				},
			}
		);
		console.log(result);
		setHumi(result.data.value);
	};

	const fetchLightData = async () => {
		const FEED_NAME = "dclv.kitchen-gas";
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
			{
				headers: {
					"X-AIO-Key": AIO_KEY,
				},
			}
		);
		console.log(result);
		setLight(result.data.value);
	};

	useEffect(() => {
		fetchTempData();
		fetchHumiData();
		fetchLightData();
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			fetchTempData();
			fetchHumiData();
			fetchLightData();
		}, 36000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<Router>
			<Navbar />
			<main className="App">
				<Routes>
					<Route
						exact
						path="/"
						element={
							<HomeScreen
								tempValue={temp}
								lightValue={light}
								humiValue={humi}
							/>
						}
					/>
					<Route
						exact
						path="/livingroom"
						element={
							<LivingRoomScreen
								tempValue={temp}
								lightValue={light}
								humiValue={humi}
							/>
						}
					/>
					<Route exact path="/bedroom" element={<BedRoomScreen />} />
					<Route exact path="/kitchen" element={<KitchenScreen />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
