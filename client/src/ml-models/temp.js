import axios from "axios";
import {
	getClasses,
	getClassesAsNumber,
	getCrossValidationSets,
	getDataset,
	getDistinctClasses,
	getNumbers,
} from "ml-dataset-iris";
import { RandomForestClassifier as RFClassifier } from "ml-random-forest";
import { tempData } from "../data/dataset/temp";
import { tempPredictions } from "../data/prediction/temp";

export const tempModelPredict = (data) => {
	// const trainingSet = tempData;
	// const predictions = tempPredictions;

	const trainingSet = getNumbers();
	const predictions = getClasses().map((elem) =>
		getDistinctClasses().indexOf(elem)
	);
	console.log(predictions);
	const options = {
		seed: 1,
		maxFeatures: 1,
		replacement: true,
		nEstimators: 50,
	};

	const classifier = new RFClassifier(options);
	classifier.train(trainingSet, predictions);

	const result = classifier.predict(trainingSet);
	// const oobResult = classifier.predictOOB();
	// const confusionMatrix = classifier.getConfusionMatrix();

	return result;
};
