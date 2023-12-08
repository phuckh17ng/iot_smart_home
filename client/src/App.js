import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import BedRoomScreen from "./screen/BedRoomScreen";
import HomeScreen from "./screen/HomeScreen";
import KitchenScreen from "./screen/KitchenScreen";
import LivingRoomScreen from "./screen/LivingRoomScreen";
function App() {
  //fetch data from adafruit server
  const AIO_KEY = ""; //zalo to get this key
  const AIO_USERNAME = "huynhngoctan";
  //latest temperature in real time
  const [temp, setTemp] = useState(null);
  const [humi, setHumi] = useState(null);
  const [light, setLight] = useState(null);

  const [tempGraph, setTempGraph] = useState([]);
  const [humiGraph, setHumiGraph] = useState([]);
  const [lightGraph, setLightGraph] = useState([]);

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
    setTemp(67);
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

  const fetchLightGraph = async () => {
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
    setLightGraph(newData);
  };
  console.log(lightGraph);

  useEffect(() => {
    fetchTempData();
    fetchHumiData();
    fetchLightData();
    fetchTempGraph();
    fetchHumiGraph();
    fetchLightGraph();
    const intervalId = setInterval(() => {
      fetchTempData();
      fetchHumiData();
      fetchLightData();
      fetchTempGraph();
      fetchHumiGraph();
      fetchLightData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <div className="flex bg-[#eff3fb] min-h-screen">
        <Sidebar tempPredictionData={tempPredictionData} />
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
                  lightValue={light}
                  humiValue={humi}
                  tempGraph={tempGraph}
                  humiGraph={humiGraph}
                  lightGraph={lightGraph}
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
                  lightValue={light}
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
