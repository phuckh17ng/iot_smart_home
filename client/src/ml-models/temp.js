import { getClasses, getDistinctClasses, getNumbers } from "ml-dataset-iris";
import { RandomForestClassifier as RFClassifier } from "ml-random-forest";

export const tempModelPredict = (data) => {
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
};
