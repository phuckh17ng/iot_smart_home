import React from "react";
import BedRoom from "../components/BedRoom";
import Kitchen from "../components/Kitchen";
import LivingRoom from "../components/LivingRoom";
const HomeScreen = ({ tempValue, humiValue, lightValue }) => {
	return (
		<div className="w-full h-[100vh] bg-slate-200">
			<div className=" w-full pt-32">
				<div className="flex justify-evenly">
					<LivingRoom
						tempValue={tempValue}
						humiValue={humiValue}
						lightValue={lightValue}
					/>
					<BedRoom
						tempValue={tempValue}
						humiValue={humiValue}
						lightValue={lightValue}
					/>
					<Kitchen
						tempValue={tempValue}
						humiValue={humiValue}
						lightValue={lightValue}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
