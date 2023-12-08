import React, { useState } from "react";
import { checkNotification } from "../firebase/functions";

const NotificationItem = ({ data }) => {
  console.log(data);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = async () => {
    await checkNotification(data.label, data.value, data.date);
    setIsChecked(true);
  };
  if (!isChecked && Number(data.prediction) === 2) {
    return (
      <div
        className="bg-red-500/90 px-3 py-2 text-white text-start border border-white rounded-lg z-20 cursor-pointer"
        onClick={handleCheck}
      >
        <div className="font-bold">Danger</div>
        <div className="whitespace-nowrap text-sm">
          House {data.label} is {data.value}
        </div>
      </div>
    );
  }
  if (!isChecked && Number(data.prediction) === 1) {
    return (
      <div
        className=" bg-orange-400/90 px-3 py-2 text-white text-start border border-white rounded-lg z-20 cursor-pointer"
        onClick={handleCheck}
      >
        <div className="font-bold">Warning</div>
        <div className="whitespace-nowrap text-sm">
          House {data.label} is {data.value}
        </div>
      </div>
    );
  }
  if (Number(data.prediction) === 0) {
    return <></>;
  }
};

export default NotificationItem;
