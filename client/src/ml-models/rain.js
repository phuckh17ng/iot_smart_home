import { RandomForestClassifier as RFClassifier } from "ml-random-forest";
import { tempData } from "../data/dataset/temp";
import { tempPredictions } from "../data/prediction/temp";

export const rainModelPredict = (data) => {
	const trainingSet = tempData;
	const predictions = tempPredictions;

	const options = {
		seed: 0,
		maxFeatures: 1,
		replacement: true,
		nEstimators: 50,
	};

	const classifier = new RFClassifier(options);
	classifier.train(trainingSet, predictions);

	const result = classifier.predict(data);

	return result;
};
