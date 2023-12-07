import React from "react";
import NotificationItem from "./NotificationItem";

const Notification = ({ isShow, data }) => {
	console.log(data);
	return (
		isShow && (
			<div className="absolute top-8 right-0 bg-white rounded-lg max-h-48 overflow-y-auto z-20 min-w-[16rem]">
				{data
					?.sort((a, b) => b.prediction - a.prediction)
					?.map((item, index) => {
						return <NotificationItem key={index} data={item} />;
					})}
			</div>
		)
	);
};

export default Notification;
