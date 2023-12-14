import moment from "moment";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { checkNotification } from "../firebase/functions";

const NotificationCard = ({ data }) => {
	console.log(data.date);
	const [isChecked, setIsChecked] = useState(false);
	const handleCheck = async () => {
		await checkNotification(data.label, data.value, data.date);
		setIsChecked(true);
	};
	if (Number(data.prediction) === 2 && !isChecked) {
		return (
			<div className="bg-red-500/95 rounded-xl px-3 py-2 mt-3 shadow-lg">
				<div className="font-bold flex justify-between items-center">
					<span>Danger</span>
					<button type="button" onClick={handleCheck}>
						<FiX />
					</button>
				</div>
				<div className="text-xs">
					{moment(data.date).format("DD MMM YYYY, hh:mm A")}
				</div>
				<div className="text-base mt-4 font-semibold">
					House's {data.label} is {data.value} °C
				</div>
				{/* <div>{data.value}</div> */}
			</div>
		);
	}

	if (Number(data.prediction) === 1 && !isChecked) {
		return (
			<div className="bg-orange-500 rounded-xl px-3 py-2 mt-2">
				<div className="font-bold flex justify-between items-center">
					<span>Warning</span>
					<button type="button" onClick={handleCheck}>
						<FiX />
					</button>
				</div>
				<div className="text-xs">
					{moment(data.date).format("DD MMM YYYY, hh:mm A")}
				</div>

				<div className="text-base mt-4 font-semibold">
					House's {data.label} is {data.value} °C
				</div>
				{/* <div>{data.value}</div> */}
			</div>
		);
	}
	return <></>;
};

export default NotificationCard;
