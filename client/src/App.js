import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { getPredictions } from "./firebase/functions";
import BedRoomScreen from "./screen/BedRoomScreen";
import HomeScreen from "./screen/HomeScreen";
import KitchenScreen from "./screen/KitchenScreen";
import LivingRoomScreen from "./screen/LivingRoomScreen";
function App() {
	//fetch data from adafruit server
	const AIO_KEY = "aio_muad821e5hXvt1cUymqfnHJH60Ou"; //zalo to get this key
	const AIO_USERNAME = "huynhngoctan";
	//latest temperature in real time
	const [temp, setTemp] = useState(null);
	const [humi, setHumi] = useState(null);
	const [gas, setGas] = useState(null);
	const [rain, setRain] = useState(null);

	const [tempGraph, setTempGraph] = useState([]);
	const [humiGraph, setHumiGraph] = useState([]);
	const [gasGraph, setGasGraph] = useState([]);
	const [rainGraph, setRainGraph] = useState([]);

	const [tempPredictionData, setTempPredictionData] = useState([]);
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
		setTemp(Number(70));
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

	const fetchGasData = async () => {
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
		setGas(result.data.value);
	};

	const fetchRainData = async () => {
		const FEED_NAME = "dclv.kitchen-rain";
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`,
			{
				headers: {
					"X-AIO-Key": AIO_KEY,
				},
			}
		);
		console.log(result);
		setRain(result.data.value);
	};

	const fetchTempGraph = async () => {
		const FEED_NAME = "dclv.kitchen-temp";
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/chart?hours=24&resolution=60`,
			{
				headers: {
					"X-AIO-Key": AIO_KEY,
				},
			}
		);

		console.log(result);
		const newData = result.data.data.map((item) => ({
			name: new Date(item[0]).toLocaleString("en-US", {
				hour: "numeric",
				hour12: true,
			}),
			temperature_in_living_room: item[1],
		}));
		setTempGraph(newData);
	};

	//humidity graph in real time
	const fetchHumiGraph = async () => {
		const FEED_NAME = "dclv.kitchen-humi";
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/chart?hours=24&resolution=60`,
			{
				headers: {
					"X-AIO-Key": AIO_KEY,
				},
			}
		);

		const newData = result.data.data.map((item) => ({
			name: new Date(item[0]).toLocaleString("en-US", {
				hour: "numeric",
				hour12: true,
			}),
			humidity_in_living_room: item[1],
		}));
		setHumiGraph(newData);
	};

	const fetchGasGraph = async () => {
		const FEED_NAME = "dclv.kitchen-gas";
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/chart?hours=24&resolution=60`,
			{
				headers: {
					"X-AIO-Key": AIO_KEY,
				},
			}
		);
		const newData = result.data.data.map((item) => ({
			name: new Date(item[0]).toLocaleString("en-US", {
				hour: "numeric",
				hour12: true,
			}),
			light_in_living_room: item[1],
		}));
		setGasGraph(newData);
	};

	const fetchRainGraph = async () => {
		const FEED_NAME = "dclv.kitchen-rain";
		const result = await axios(
			`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/chart?hours=24&resolution=60`,
			{
				headers: {
					"X-AIO-Key": AIO_KEY,
				},
			}
		);
		const newData = result.data.data.map((item) => ({
			name: new Date(item[0]).toLocaleString("en-US", {
				hour: "numeric",
				hour12: true,
			}),
			rain_in_living_room: item[1],
		}));
		setRainGraph(newData);
	};
	console.log(gasGraph);

	const [predictions, setPredictions] = useState();
	const fetchPredictions = async () => {
		const result = await getPredictions();
		setPredictions(result);
	};
	useEffect(() => {
		fetchTempData();
		fetchHumiData();
		fetchGasData();
		fetchRainData();

		fetchTempGraph();
		fetchHumiGraph();
		fetchGasGraph();
		fetchRainGraph();

		fetchPredictions();
		const intervalId = setInterval(() => {
			fetchTempData();
			fetchHumiData();
			fetchGasData();
			fetchRainData();

			fetchTempGraph();
			fetchHumiGraph();
			fetchGasGraph();
			fetchRainGraph();

			fetchPredictions();
		}, 5000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<Router>
			<div className="flex bg-[#eff3fb] min-h-screen">
				<Sidebar
					tempPredictionData={tempPredictionData}
					predictions={predictions}
				/>
				<main className="App w-full">
					<Navbar tempPredictionData={tempPredictionData} />
					<div></div>
					<Routes>
						<Route
							exact
							path="/"
							element={
								<HomeScreen
									tempValue={temp}
									gasValue={gas}
									humiValue={humi}
									rainValue={rain}
									tempGraph={tempGraph}
									humiGraph={humiGraph}
									gasGraph={gasGraph}
									rainGraph={rainGraph}
									setTempPredictionData={setTempPredictionData}
									tempPredictionData={tempPredictionData}
								/>
							}
						/>
						<Route
							exact
							path="/livingroom"
							element={
								<LivingRoomScreen
									tempValue={temp}
									lightValue={gas}
									humiValue={humi}
								/>
							}
						/>
						<Route exact path="/bedroom" element={<BedRoomScreen />} />
						<Route exact path="/kitchen" element={<KitchenScreen />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
