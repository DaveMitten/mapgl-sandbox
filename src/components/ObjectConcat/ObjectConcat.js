import React, { Component } from "react";
import locationAndPostcode from "../../dummyData/locationAndPostcode.json";
import locationPriceYear from "../../dummyData/locationPriceYear.json";

class ObjectConcat extends Component {
	componentDidMount() {
		this.sortData(this.setDataObj);
	}
	sortData = callback => {
		const mapped = locationPriceYear.YLP.map(i => Object.values(i));
		const result = mapped.map(i => {
			return i.map(j => {
				const location = j.location;
				return Object.entries(locationAndPostcode)
					.map(i => {
						const local = i[0];
						const post = i[1];
						return [local, post];
					})
					.filter(element => element[0] === location)
					.map(element => {
						return {
							location,
							postcode: element[1],
							price: j.price,
							year: j.year
						};
					});
			});
		});
		callback(result);
	};

	setDataObj = obj => {
		this.setState({ obj });
	};

	iteratedData = () => {
		this.state && this.state.obj.map(i => i.map(i => i));
	};

	render() {
		console.log(
			"this.state",
			this.state && this.state.obj.map(i => i).map(i => i)
		);

		return <div>{this.state && JSON.stringify(this.state.obj)}</div>;
	}
}

export default ObjectConcat;
