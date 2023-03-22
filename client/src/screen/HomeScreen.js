import React from "react";
import BedRoom from "../components/BedRoom";
import Kitchen from "../components/Kitchen";
import LivingRoom from "../components/LivingRoom";
const HomeScreen = () => {
	return (
		<div className="w-full h-[100vh] bg-slate-200">
			<div className=" w-full pt-32">
				<div className="flex justify-evenly">
					<LivingRoom />
					<BedRoom />
					<Kitchen />
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
