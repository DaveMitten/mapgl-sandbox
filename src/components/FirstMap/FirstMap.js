import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
// import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import { jan95, jan00, jan05 } from "../../dummyData/concatData";
// import testData from "../../dummyData/testDataHexNo3.json";
import data from "../../dummyData/useThisData.json";
import todaysDataPostcode from "../../dummyData/todaysDataPostcode.json";
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

const elevationScale = { min: 0, max: 3 };

class FirstMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: "",
			year: 0,
			elevationScale: elevationScale.min
		};

		this.startAnimationTimer = null;
		this.intervalTimer = null;

		this._startAnimate = this._startAnimate.bind(this);
		this._animateHeight = this._animateHeight.bind(this);
	}

	componentDidMount() {
		this.setState({
			location: jan95
		});

		this._animate();
	}

	_animate() {
		this._stopAnimate();

		// wait 1.5 secs to start animation so that all data are loaded
		this.startAnimationTimer = window.setTimeout(this._startAnimate, 3500);
	}

	_startAnimate() {
		this.intervalTimer = window.setInterval(this._animateHeight, 20);
	}

	_stopAnimate() {
		window.clearTimeout(this.startAnimationTimer);
		window.clearTimeout(this.intervalTimer);
	}

	_animateHeight() {
		if (this.state.elevationScale === elevationScale.max) {
			this._stopAnimate();
		} else {
			this.setState({ elevationScale: this.state.elevationScale + 1 });
		}
	}

	_layerRendering = () => {
		const stateLocation = this.state.location;
		const valuesOfState = stateLocation[0];
		return [
			new H3HexagonLayer({
				id: "h3-hexagon-layer",
				data: this.state.location && Object.values(valuesOfState),
				pickable: true,
				opacity: 0.15,
				wireframe: true,
				filled: true,
				extruded: true,
				elevationScale: this.state.elevationScale,
				coverage: 50,
				getHexagon: d => d.h3Location,
				getFillColor: [223, 25, 149], // fluorescent pink
				getElevation: d => {
					// console.log("d.price", d.price * 0.5);
					return Number(d.price / 10);
				}
			})
		];
	};

	dataStateChange = () => {
		const toJan00 = () =>
			this.setState({
				location: jan00
			});
		const toJan05 = () => {
			this.setState({
				location: jan05
			});
		};
		const toJan95 = () => {
			this.setState({
				location: jan95
			});
		};

		console.log("this.state selected date change", this.state);
		setTimeout(toJan00, setTimeout(toJan05, 2000), 2000);
		if (this.state.location === jan05) {
			setTimeout(toJan95, 2000);
		}
	};

	// yearOnChange = e => {
	// 	const data = {
	// 		0: jan95,
	// 		1: jan00,
	// 		2: jan05
	// 	};
	// 	window.setTimeout(() => {
	// 		this.setState({
	// 			location: data[e.currentTarget.value],
	// 			year: e.currentTarget.value
	// 		});
	// 	}, 10000);
	// };

	yearOnChange = e => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		const data = {
			0: jan95,
			1: jan00,
			2: jan05
		};
		this.setState({
			location: data[e.currentTarget.value],
			year: e.currentTarget.value
		});
		// window.setTimeout(
		// 	() =>
		// 		this.setState({
		// 			location: data[e.currentTarget.value],
		// 			year: e.currentTarget.value
		// 		}),
		// 	10000
		// );
	};
	// addLatLon = (location, latLon) => {
	// 	return location.map(compiledDataObj => {
	// 		const objectsWithSameLocation = latLon.filter(dataObj => {
	// 			return dataObj.postcode === compiledDataObj.postcode;
	// 		});

	// 		objectsWithSameLocation.map(obj => {
	//here we want to match the postcode of the object we're running through
	// so its like
	// 		compiledDataObj.postcode[obj.postcode]

	// return console.log('location.postcode', location.map(i => i.postcode), 'obj.postcode', obj.postcode)
	// 		});
	// 	});
	// };

	addLatLon = (location, latLon) => {
		const result = location.map(e => {
			const coords = latLon.find(ee => ee.postcode === e.postcode);

			return Object.assign(e, {
				longitude: coords["longitude"],
				latitude: coords["latitude"]
			});
		});
		
		return result;
	};

	render() {
		const doIt = this.addLatLon(data, todaysDataPostcode);
		console.log('doIt', doIt)

		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				{JSON.stringify(doIt)}
				{/* <YearSelector
					yearOnChange={this.yearOnChange}
					year={this.state.year}
					dataStateChange={this.dataStateChange}
				/>
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
						preventStyleDiffing={true}
						mapboxApiAccessToken={MAPBOX_TOKEN}
					/>
				</DeckGL> */}
			</div>
		);
	}
}

export default FirstMap;
