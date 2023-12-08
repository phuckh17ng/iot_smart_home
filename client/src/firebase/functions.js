import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

export const getTempPredictions = async () => {
  // const q = query(collection(db, "temp"));
  // onSnapshot(q, (querySnapshot) => {
  // 	querySnapshot.forEach((doc) => {
  // 		console.log(doc?.data());
  // 		return doc?.data();
  // 	});
  // });

  var data = [];
  const q = query(
    collection(db, "notification"),
    where("isChecked", "==", false)
  );

  const docs = await getDocs(q);
  docs.forEach((doc) => {
    data = [...data, doc?.data()];
  });
  console.log(data);
  return data;
};

export const addTempPrediction = async (label, value, prediction) => {
  const date = new Date();
  addDoc(collection(db, "notification"), {
    date: date.toISOString(),
    label: label,
    value: value,
    prediction: prediction,
    isChecked: false,
  });
};

export const checkNotification = async (label, value, date) => {
  const q = query(
    collection(db, "notification"),
    where("label", "==", label),
    where("value", "==", value),
    where("date", "==", date)
  );
  const docs = await getDocs(q);
  docs.forEach((document) => {
    updateDoc(doc(db, "notification", document.ref.id), {
      isChecked: true,
    });
    console.log("updated");
  });
};
