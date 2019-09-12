import React from "react";
import FirstMap from "./components/FirstMap/FirstMap";
// import DataConversion from "./components/DataConversion/DataConversion";
import PostCodeConverter from './components/PostCodeConverter/PostCodeConverter'

function App() {
	return (
		<div className="App">
			<FirstMap />
			<PostCodeConverter />
			{/* <ObjectConcat /> */}
			{/* <DataConversion /> */}
		</div>
	);
}

export default App;
