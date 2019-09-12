import React, { Component } from "react";
import data from "../../dummyData/useThisData.json";

class PostCodeConverter extends Component {
	render() {
		console.log("data", data.map(i => i.year[96]));
		return <div></div>;
	}
}
export default PostCodeConverter;
