import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCIMNmOHHnY5VXkPZ8dYfTUFCz9XDu6whM",
	authDomain: "iot-smarthome-e2171.firebaseapp.com",
	projectId: "iot-smarthome-e2171",
	storageBucket: "iot-smarthome-e2171.appspot.com",
	messagingSenderId: "962522235254",
	appId: "1:962522235254:web:7b0320e6c2e10b873cba57",
	measurementId: "G-519JMT1FDF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
