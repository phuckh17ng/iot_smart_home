import axios from "axios";
import {
  getClasses,
  getClassesAsNumber,
  getCrossValidationSets,
  getDataset,
  getDistinctClasses,
  getNumbers,
} from "ml-dataset-iris";
import {
  RandomForestClassifier as RFClassifier,
  RandomForestRegression as RFRegression,
} from "ml-random-forest";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const LivingRoom = ({ tempValue, humiValue, lightValue }) => {
  const trainingSet = getNumbers();
  const predictions = getClasses().map((elem) =>
    getDistinctClasses().indexOf(elem)
  );
  console.log("trainingSet", trainingSet);
  console.log("predictions", predictions);
  const options = {
    seed: 3,
    maxFeatures: 1,
    replacement: true,
    nEstimators: 40,
  };

  const classifier = new RFClassifier(options);
  classifier.train(trainingSet, predictions);
  const test = [
    [5.1, 3.5, 1.4, 0.2],
    [6, 3, 4, 1],
    [6, 3, 5, 2],
  ];
  const result = classifier.predict(test);
  const oobResult = classifier.predictOOB();
  const confusionMatrix = classifier.getConfusionMatrix();
  console.log("result", result);
  console.log("oobResult", oobResult);
  console.log("confusionMatrix", confusionMatrix);

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
