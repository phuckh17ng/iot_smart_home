import moment from "moment";
import React, { useState } from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { checkNotification } from "../firebase/functions";

const NotificationCard = ({ data }) => {
	console.log(data.label);
	const [isChecked, setIsChecked] = useState(false);
	const handleCheck = async () => {
		await checkNotification(data.label, data.value, data.date);
		setIsChecked(true);
	};
	if (Number(data.prediction) === 2 && !isChecked) {
		return (
			<div className="bg-[#20315c] rounded-xl px-3 py-2 mt-3 shadow-lg">
				<div className="font-bold flex justify-between items-center">
					<div className="flex items-center">
						<FiAlertCircle color="#c1363f" size={20} />{" "}
						<div className="ml-2">Danger</div>
					</div>
					<button type="button" onClick={handleCheck}>
						<FiX size={20} />
					</button>
				</div>
				<div className="text-xs opacity-50">
					{moment(data.date).format("DD MMM YYYY, hh:mm A")}
				</div>
				<div className="text-sm mt-4 font-semibold">
					House's {data.label} is {data.value}
					{data.label === "temperature" && "°C"}
				</div>
				{/* <div>{data.value}</div> */}
			</div>
		);
	}

	if (Number(data.prediction) === 1 && !isChecked) {
		return (
			<div className="bg-[#20315c] rounded-xl px-3 py-2 mt-3 shadow-lg">
				<div className="font-bold flex justify-between items-center">
					<div className="flex items-center">
						<FiAlertCircle color="#a17d4e" size={20} />{" "}
						<div className="ml-2">Warning</div>
					</div>
					<button type="button" onClick={handleCheck}>
						<FiX size={20} />
					</button>
				</div>
				<div className="text-xs opacity-50">
					{moment(data.date).format("DD MMM YYYY, hh:mm A")}
				</div>
				<div className="text-sm mt-4 font-semibold">
					House's {data.label} is {data.value}
					{data.label === "temperature" && "°C"}
				</div>
				{/* <div>{data.value}</div> */}
			</div>
		);
	}
	return <></>;
};

export default NotificationCard;
