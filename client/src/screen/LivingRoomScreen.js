import React, { useEffect, useState } from "react";
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

	return (
		<div className="w-full h-[100vh] bg-slate-200">
			<div className="w-full pt-16">
				<div className="w-[90%] h-full bg-white z-20 rounded-3xl drop-shadow-xl px-6 mx-auto">
					<div className="flex items-end w-full pt-3">
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
							<span className="text-3xl ml-6 font-bold mr-3">30</span>
						</div>
						<div className="flex mt-6 items-end justify-between">
							<img
								src={require("../img/icons8-humidity-64 (1).png")}
								alt="livingroom"
							></img>
							<span className="text-3xl ml-6 font-bold mr-3">30</span>
						</div>
						<div className="flex mt-6 items-end justify-between">
							<img
								src={require("../img/icons8-sunny-64.png")}
								alt="livingroom"
							></img>
							<span className="text-3xl ml-6 font-bold mr-3">30</span>
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
