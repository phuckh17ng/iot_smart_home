import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
// import { useStore, actions } from './store'

import BedRoomScreen from "./screen/BedRoomScreen";
import HomeScreen from "./screen/HomeScreen";
import KitchenScreen from "./screen/KitchenScreen";
import LivingRoomScreen from "./screen/LivingRoomScreen";
function App() {
	// const [state, dispatch] = useStore()

	return (
		<Router>
			<Navbar />
			<main className="App">
				<Routes>
					<Route exact path="/" element={<HomeScreen />} />
					<Route exact path="/livingroom" element={<LivingRoomScreen />} />
					<Route exact path="/bedroom" element={<BedRoomScreen />} />
					<Route exact path="/kitchen" element={<KitchenScreen />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
