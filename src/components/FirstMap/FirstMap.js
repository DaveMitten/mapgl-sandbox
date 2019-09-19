import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import DeckGL from "@deck.gl/react";
// import { jan95, jan00, jan05 } from "../../dummyData/concatData";
import { geoToH3 } from "h3-js";
// import testData from "../../dummyData/testDataHexNo3.json";
import data from "../../dummyData/useThisData.json";
import todaysDataPostcode from "../../dummyData/todaysDataPostcode.json";
import YearSelector from "../YearSelector/YearSelector";
import dataSet from "../finalDataSet/finalDataSet.json";

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

const elevationScale = { min: 0, max: 100 };

class FirstMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locationData: "",
			year: 95,
			elevationScale: elevationScale.min,
			yearArr: []
		};

		this.startAnimationTimer = null;
		this.intervalTimer = null;

		this._startAnimate = this._startAnimate.bind(this);
		this._animateHeight = this._animateHeight.bind(this);
	}

	componentDidMount() {
		const yearArrSorted = dataSet && this.playFunction();

		this.setState({
			locationData: dataSet,
			yearArr: yearArrSorted
		});
		this._layerRendering();
		this._animate();
	}
	// deprecated method, looking at componentGetDerivedStateFromProps
	// need to wrap thi/turn it into a highger order component so i can use the outer layer to require the data and then pass it down as props.
	// little unsure if this is correct as it will depend on state unless i initialise the state with props passed down from the wrapper, but then that argues whether i would need to
	// do the wrapper in the first place as i could just start the state with data being passed to it already
	UNSAFE_componentWillReceiveProps(nextProps) {
		// if new data is passed through it will initiate the re-redndering of the data and the animation based on the elevation scale, which currently animates correctly upon load
		if (
			nextProps.data &&
			this.props.data &&
			nextProps.data.length !== this.props.data.length
		) {
			this._animate();
		}
	}
	//   {---------------------- NEW METHOD FOR componentWillReceiveProps -----------------------------}
	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	if (nextProps.total !== prevState.total) {
	// 	  return ({ total: nextProps.total }) // <- this is setState equivalent
	// 	}
	// 	etc...
	//   }
	//   {---------------------- NEW METHOD FOR componentWillReceiveProps -----------------------------}

	// Would be good in the fianl versio nto extract these to helper functions/animations to clean up the code{ -------_-_-_-___--_-_-_---_-________-____--__-___-_-____---
	_animate() {
		this._stopAnimate();

		// wait 7 secs to start animation so that all data are loaded
		this.startAnimationTimer = window.setTimeout(this._startAnimate, 7000);
	}

	_startAnimate() {
		this.intervalTimer = window.setInterval(this._animateHeight, 10);
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
	// ---------------------------------________------____---------___---___---_________----____-_-_-_-_-_-_--_-_-_-_ }

	_layerRendering = () => {
		const newobj =
			this.state.locationData &&
			this.state.locationData.map(i => {
				return {
					longitude: i.longitude,
					latitude: i.latitude,
					price: i.year[this.state.year]
				};
			});
		return [
			new H3HexagonLayer({
				id: "h3-hexagon-layer",
				data: this.state.locationData && newobj,
				pickable: true,
				opacity: 0.15,
				wireframe: true,
				filled: true,
				extruded: true,
				elevationScale: this.state.elevationScale,
				coverage: 50,
				getHexagon: d => {
					let local = geoToH3(d.latitude, d.longitude, 12);
					return local;
				},
				getFillColor: [223, 25, 149], // fluorescent pink
				getElevation: d => this.state.locationData && Number(d.price / 500)
			})
		];

		// new H3HexagonLayer({
		// 	id: "h3-hexagon-layer",
		// 	data: this.state.location && Object.values(valuesOfState),
		// 	pickable: true,
		// 	opacity: 0.15,
		// 	wireframe: true,
		// 	filled: true,
		// 	extruded: true,
		// 	elevationScale: this.state.elevationScale,
		// 	coverage: 50,
		// 	getHexagon: d => d.h3Location,
		// 	getFillColor: [223, 25, 149], // fluorescent pink
		// 	getElevation: d => Number(d.price / 100)
		// })
		// 	new HexagonLayer({
		// 		id: "hexagon-layer",
		// 		data: this.state.locationData && this.state.locationData,
		// 		pickable: true,
		// 		opacity: 0.15,
		// 		wireframe: true,
		// 		filled: true,
		// 		extruded: true,
		// 		elevationScale: this.state.elevationScale,
		// 		coverage: 5,
		// 		//works for lat/lon they dont change
		// 		getPosition: d => [d.longitude, d.latitude],
		// 		// getFillColor: [223, 25, 149], // fluorescent pink
		// 		// colorRange: [223, 25, 149], // fluorescent pink
		// 		// data needs to change depending on the year
		// 		getElevation: d =>
		// 		Number(d.year[this.state.year && this.state.year])
		// 		// Number(d.price / 100)
		// 	})
		// ];
	};

	// _renderLayers() {
	// 	const {
	// 		data,
	// 		radius = 1000,
	// 		upperPercentile = 100,
	// 		coverage = 1
	// 	} = this.props;

	// 	return [
	// 		new HexagonLayer({
	// 			// colorRange,
	// 			elevationRange: [0, 3000],
	// 			elevationScale: this.state.elevationScale,
	// 			extruded: true,
	// 			getPosition: d => d

	// 			// radius,
	// 			// material
	// 		})
	// 	];
	// }

	// dataStateChange = () => {
	// 	const toJan00 = () =>
	// 		this.setState({
	// 			location: jan00
	// 		});
	// 	const toJan05 = () => {
	// 		this.setState({
	// 			location: jan05
	// 		});
	// 	};
	// 	const toJan95 = () => {
	// 		this.setState({
	// 			location: jan95
	// 		});
	// 	};

	// 	console.log("this.state selected date change", this.state);
	// 	setTimeout(toJan00, setTimeout(toJan05, 2000), 2000);
	// 	if (this.state.location === jan05) {
	// 		setTimeout(toJan95, 2000);
	// 	}
	// };
	yearOnChange = e => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			year: e.currentTarget.value,
			elevationScale: this.state.elevationScale - 40
		});
		this._stopAnimate();
		this._startAnimate();
	};

	playFunction = () => {
		//i know this is unreadable, but i wanted to see how simple i could go.
		return dataSet.map(i => {
			return Object.keys(Object.values(i)[2])
				.map(i => (i.startsWith(9) ? 19 + i : 20 + i))
				.sort();
		})[0];
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

	// addLatLon = (location, latLon) => {
	// 	const result = location.map(e => {
	// 		const coords = latLon.find(ee => ee.postcode === e.postcode);

	// 		return Object.assign(e, {
	// 			longitude: coords["longitude"],
	// 			latitude: coords["latitude"]
	// 		});
	// 	});

	// 	return result;
	// };

	render() {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<YearSelector
					yearOnChange={this.yearOnChange}
					year={this.state.year}
					dataStateChange={this.dataStateChange}
					dataSet={dataSet}
					years={this.state.yearArr && this.state.yearArr}
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
				</DeckGL>
			</div>
		);
	}
}

export default FirstMap;
