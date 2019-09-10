import React from "react";
import FirstMap from "./components/FirstMap/FirstMap";
// import ObjectConcat from "./components/ObjectConcat/ObjectConcat";
import PostcodeConverter from "./components/PostcodeConverter/PostcodeConverter";

function App() {
	return (
		<div className="App">
			<FirstMap />
			{/* <ObjectConcat /> */}
			<PostcodeConverter />
		</div>
	);
}

export default App;
