import axios from "axios";
import { RandomForestRegression as RFRegression } from "ml-random-forest";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LivingRoom = ({ tempValue, humiValue, lightValue }) => {
	const dataset = [
		[73, 80, 75, 152],
		[93, 88, 93, 185],
		[89, 91, 90, 180],
		[96, 98, 100, 196],
		[73, 66, 70, 142],
		[53, 46, 55, 101],
		[69, 74, 77, 149],
		[47, 56, 60, 115],
		[87, 79, 90, 175],
		[79, 70, 88, 164],
		[69, 70, 73, 141],
		[70, 65, 74, 141],
		[93, 95, 91, 184],
		[79, 80, 73, 152],
		[70, 73, 78, 148],
		[93, 89, 96, 192],
		[78, 75, 68, 147],
		[81, 90, 93, 183],
		[88, 92, 86, 177],
		[78, 83, 77, 159],
		[82, 86, 90, 177],
		[86, 82, 89, 175],
		[78, 83, 85, 175],
		[76, 83, 71, 149],
		[96, 93, 95, 192],
	];

	// const trainingSet = new Array(dataset.length);
	// const predictions = new Array(dataset.length);

	// for (let i = 0; i < dataset.length; ++i) {
	// 	trainingSet[i] = dataset[i].slice(0, 3);
	// 	predictions[i] = dataset[i][3];
	// }

	// const options = {
	// 	seed: 3,
	// 	maxFeatures: 2,
	// 	replacement: false,
	// 	nEstimators: 200,
	// };

	// const regression = new RFRegression(options);
	// regression.train(trainingSet, predictions);
	// const result = regression.predict(trainingSet);

	console.log("result", result);
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
					<span className="text-3xl ml-6 font-bold mr-3">{tempValue}</span>
				</div>
				<div className="flex mt-6 items-end justify-between">
					<img
						src={require("../img/icons8-humidity-64 (1).png")}
						alt="livingroom"
					></img>
					<span className="text-3xl ml-6 font-bold mr-3">{humiValue}</span>
				</div>
				<div className="flex mt-6 items-end justify-between">
					<img
						src={require("../img/icons8-sunny-64.png")}
						alt="livingroom"
					></img>
					<span className="text-3xl ml-6 font-bold mr-3">{lightValue}</span>
				</div>
			</div>
		</Link>
	);
};

export default LivingRoom;
