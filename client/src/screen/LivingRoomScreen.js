import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./LivingRoomScreen.css";

const LivingRoomScreen = ({ tempValue, humiValue, lightValue }) => {
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
  const AIO_KEY = "aio_BhiF90eYnvIKkYH5onaY86Bxk95g"; //zalo to get this key
  const AIO_USERNAME = "huynhngoctan";

  //temperature line graph in real time
  const [DHT20TempGraph, setDHT20TempGraph] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const FEED_NAME = "dclv.kitchen-temp";
      axios
        .get(
          `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data?limit=20`
        )
        .then((response) => {
          const newData = response.data.map((item) => ({
            name: new Date(item.created_at).toLocaleTimeString(),
            temperature_in_living_room: item.value,
          }));
          setDHT20TempGraph(newData);
        })
        .catch((error) => console.error(error));
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  //humidity graph in real time
  const [DHT20HumiGraph, setDHT20HumiGraph] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const FEED_NAME = "dclv.kitchen-humi";
      axios
        .get(
          `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data?limit=20`
        )
        .then((response) => {
          const newData = response.data.map((item) => ({
            name: new Date(item.created_at).toLocaleTimeString(),
            humidity_in_living_room: item.value,
          }));
          setDHT20HumiGraph(newData);
        })
        .catch((error) => console.error(error));
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  //light graph in real time
  const [lightGraph, setLightGraph] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const FEED_NAME = "dclv.kitchen-gas";
      axios
        .get(
          `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data?limit=20`
        )
        .then((response) => {
          const newData = response.data.map((item) => ({
            name: new Date(item.created_at).toLocaleTimeString(),
            light_in_living_room: item.value,
          }));
          setLightGraph(newData);
        })
        .catch((error) => console.error(error));
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  //turn on/ off the led
  const [ledValue, setLedValue] = useState(0);
  const handleLedControl = async () => {
    const FEED_NAME = "yolo-pump"; //change this key
    const data = ledValue === 1 ? 0 : 1;
    setLedValue(ledValue === 1 ? 0 : 1);
    toggleLed(!isLedToggled);
    try {
      const response = await axios({
        method: "post",
        url: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data`,
        headers: {
          "X-AIO-Key": AIO_KEY,
          "Content-Type": "application/json",
        },
        data: {
          value: JSON.stringify(data),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
                {tempValue ? (
                  <p>
                    The current temperature is{" "}
                    <span style={{ color: "blue", fontWeight: "600" }}>
                      {tempValue}
                    </span>{" "}
                    degrees Celsius
                  </p>
                ) : (
                  <p>Loading temperature data...</p>
                )}
              </div>
            </div>

            <div className="mt-5 w-full grid">
              <LineChart
                className="place-self-center w-full"
                width={800}
                height={400}
                data={DHT20TempGraph}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit={"°C"} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature_in_living_room"
                  stroke="#8884d8"
                  activeDot={{ r: `10` }}
                />
              </LineChart>
            </div>

            <div className="flex items-end w-full pt-3">
              <img
                src={require("../img/icons8-humidity-64 (1).png")}
                alt="livingroom"
              ></img>
              {/* <span className="text-3xl ml-6 font-bold mr-3">30</span> */}
              <div className="text-xl ml-6 font-bold text-zinc-800">
                {humiValue ? (
                  <p>
                    The current humidity is{" "}
                    <span style={{ color: "blue", fontWeight: "600" }}>
                      {humiValue}
                    </span>{" "}
                    %
                  </p>
                ) : (
                  <p>Loading humidity data...</p>
                )}
              </div>
            </div>

            <div className="mt-5 w-full grid">
              <LineChart
                className="place-self-center w-full"
                width={800}
                height={400}
                data={DHT20HumiGraph}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit={"°%"} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="humidity_in_living_room"
                  stroke="#8884d8"
                  activeDot={{ r: `10` }}
                />
              </LineChart>
            </div>

            <div className="flex items-end w-full pt-3">
              <img
                src={require("../img/icons8-sunny-64.png")}
                alt="livingroom"
              ></img>
              {/* <span className="text-3xl ml-6 font-bold mr-3">30</span> */}
              <div className="text-xl ml-6 font-bold text-zinc-800">
                {lightValue ? (
                  <p>
                    The current light is{" "}
                    <span style={{ color: "blue", fontWeight: "600" }}>
                      {lightValue}
                    </span>{" "}
                    %
                  </p>
                ) : (
                  <p>Loading light data...</p>
                )}
              </div>
            </div>

            <div className="mt-5 w-full grid">
              <LineChart
                className="place-self-center w-full"
                width={800}
                height={400}
                data={lightGraph}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit={"°%"} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="light_in_living_room"
                  stroke="#8884d8"
                  activeDot={{ r: `10` }}
                />
              </LineChart>
            </div>
          </div>

          <div className="flex pb-12 mt-5">
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
                      onClick={handleLedControl}
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
