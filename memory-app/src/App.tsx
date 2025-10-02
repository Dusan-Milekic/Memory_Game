import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import Settings from "./components/Settings";
import Multiplayer from "./components/Multiplayer";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div className="flex flex-col justify-center items-center h-dvh">
							<h1 className="pb-10 text-3xl">Memory Settings</h1>
							<Settings />
						</div>
					}
				/>
				<Route path="/multiplayer" element={<Multiplayer />} />
				<Route path="/game" element={<Game />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
