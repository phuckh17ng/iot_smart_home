import React from "react";
import BedRoom from "../components/BedRoom";
import Kitchen from "../components/Kitchen";
import LivingRoom from "../components/LivingRoom";
const HomeScreen = () => {
	return (
		<div>
			<div className="relative">
				<div className="">
					<img
						src={require("../img/etienne-beauregard-riverin-B0aCvAVSX8E-unsplash.jpg")}
						alt="homescreen"
						className="w-full h-full opacity-75 z-0"
					></img>
				</div>
				<div className="fixed top-[30%] w-full">
					<div className="flex justify-evenly">
						<LivingRoom />
						<BedRoom />
						<Kitchen />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
