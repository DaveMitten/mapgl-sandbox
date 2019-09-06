import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import { jan95, jan00, jan05 } from "../../dummyData/concatData";
import testData from "../../dummyData/testDataHexNo3.json";
import YearSelector from "../YearSelector/YearSelector";

const MAPBOX_TOKEN =
	"pk.eyJ1Ijoiam5hbGV4YW5kZXIxMCIsImEiOiJjaWlobnE4eGswMDFld2RtNmZxMDl3Nzc3In0.UTaIFjrs21qB1npSeliZbQ";

const mapStyle =
	"mapbox://styles/jnalexander10/cj0xo73a300rr2rta4ny2bj0d/draft/";

const INITIAL_VIEW_STATE = {
	longitude: 0.1278,
	latitude: 51.5074,
	zoom: 7,
	minZoom: 5,
	maxZoom: 10,
	pitch: 50,
	bearing: -27.396674584323023
};

class FirstMap extends Component {
	state = {
		location: "",
		year: 0
	};

	componentDidMount() {
		this.setState({
			location: jan95
		});
	}

	// extractedData = () => {
	// 	const areaDataResult = areaData.map(i => i.result);
	// 	areaDataResult.map(i => {
	// 		if (i === null) return console.warn("no result found");
	// 		const h3Location = geoToH3(i.latitude, i.longitude, 12);
	// 		const locationName = i.nuts;
	// 		const locationDone = {[locationName]: { h3Location }};
	// 		console.log('locationDone', locationDone)
	// 		this.setState({
	// 			[locationName]: { h3Location }
	// 		});
	// 		return locationDone;
	// 	});
	// };

	// concatTwoObj = () => {
	// 	const objOne = this.extractedData();
	// 	console.log('this.extractedData()', this.extractedData())
	// 	const objTwo = locationAvrgPrice;
	// 	console.log('locationAvrgPrice', locationAvrgPrice)
	// 	const finalObj = objOne.concat(objTwo);
	// 	return console.log('finalObj', finalObj)
	// }
	// setPrice = () => {
	// 	return Object.entries(locationAvrgPrice).map(
	// 		i => {
	// 			console.log('i', i)
	// 			if (this.state.i) {
	// 				const joined = this.state.i[0].concat(i[1]);
	// 				this.setState({ [i[0]]: joined });
	// 			}
	// 		}

	// 		// this.setState({
	// 		// 	price: { [i[0]]: i[1] }
	// 		// })
	// 	);
	// };
	_layerRendering = () => {
		const stateLocation = this.state.location;
		const valuesOfState = stateLocation[0];
		return [
			new H3HexagonLayer({
				id: "h3-hexagon-layer",
				data: valuesOfState && Object.values(valuesOfState),
				pickable: true,
				opacity: 0.15,
				wireframe: true,
				filled: true,
				extruded: true,
				coverage: 50,
				getHexagon: d => d.h3Location,
				getFillColor: [223, 25, 149], // fluorescent pink
				getElevation: d => d.price * 0.6
			})
		];
	};

	// newData = testData;

	// newData = eval(testData);
	// _layer = new HexagonLayer({
	// 	id: "hexagon-layer",
	// 	data: testData,
	// 	pickable: true,
	// 	extruded: true,
	// 	radius: 200,
	// 	elevationScale: 100,
	// 	// upperPercentile: 100,
	// 	// getElevationValue: d =>
	// 	getPosition: d => d.COORDINATES
	// });

	yearOnChange = e => {
		const data = {
			0: jan95,
			1: jan00,
			2: jan05
		};
		this.setState({
			location: data[e.currentTarget.value],
			year: e.currentTarget.value
		});
	};

	render() {
		console.log("testData", testData);

		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<YearSelector yearOnChange={this.yearOnChange} year={this.state.year} />
				<DeckGL
					// layers={this._layer}
					layers={this._layerRendering()}
					initialViewState={INITIAL_VIEW_STATE}
					controller={true}
				>
					<StaticMap
						reuseMaps
						mapStyle={mapStyle}
						MapController
						mapboxApiAccessToken={MAPBOX_TOKEN}
					/>
				</DeckGL>
			</div>
		);
	}
}

export default FirstMap;
