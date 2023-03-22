import React from "react";
const LivingRoomScreen = () => {
	return (
		<div className="w-full h-[100vh] bg-slate-200">
			<div className="w-full pt-52">
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
				</div>
			</div>
		</div>
	);
};

export default LivingRoomScreen;
