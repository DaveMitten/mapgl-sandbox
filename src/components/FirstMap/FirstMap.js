import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import DeckGL from "@deck.gl/react";
import { geoToH3 } from "h3-js";
import YearSelector from "../YearSelector/YearSelector";
// import {_animate, _startAnimate, _stopAnimate, _animateHeight} from '../helpers/helperFunctions'
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
		const yearArrSorted = dataSet && this.sortYears();
		this.setState({
			locationData: dataSet,
			yearArr: yearArrSorted
		});
		this._layerRendering();
		this._animate();
		// this.cycleYearData();
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
		this.startAnimationTimer = window.setTimeout(this._startAnimate, 6000);
	}

	// _startAnimate() {
	// 	this.intervalTimer = window.setInterval(this._animateHeight, 10);
	// }
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
				getElevation: d => this.state.locationData && Number(d.price / 500),
				transitions: {
					getElevation: {
						duration: 3000,
						// easing: easeCubicInOut,
						enter: value => [value[0], value[1], value[2], 0]
					}
				}
			})
		];
	};

	yearOnChange = e => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			year: e.currentTarget.value,
			// elevationScale: this.state.elevationScale - 30
		});
		// this._stopAnimate();
		// this._startAnimate();
	};

	sortYears = () =>
		dataSet.map(i => {
			return Object.keys(Object.values(i)[2])
				.map(i => (i.startsWith(9) ? 19 + i : 20 + i))
				.sort();
		})[0];

	// getPercentageChange = (oldNumber, newNumber) => {
	// 	const decreaseValue = oldNumber - newNumber;
	// 	return (decreaseValue / oldNumber) * 100;
	// };

	// findNewHeight = () => {
	// 	return this.state.locationData.map(i => i.year[this.state.year])[0];
	// };

	cycleYearData = () => {
		let i = 0;
		const myLoop = () => {
			// const deduct = () => {
			// 	const result = this.getPercentageChange(
			// 		this.findNewHeight(),
			// 		this.state.yearArr[0]
			// 	);
			// 	this.setState({
			// 		elevationScale: this.state.elevationScale - 40
			// 	});
			// 	this._stopAnimate();
			// 	this._startAnimate();
			// };
			setTimeout(() => {
				i++;
				if (i < this.state.yearArr.length) {
					this.setState(state => ({
						year: state.yearArr[i].slice(2),
						elevationScale: state.elevationScale - 30
					}));
					myLoop();
				}
			}, 2000);
		};
		myLoop();
	};

	// getPercentageChange = (oldNumber, newNumber) => {
	// 	const decreaseValue = oldNumber - newNumber;
	// 	console.log("decreaseValue", decreaseValue);
	// 	const result = (decreaseValue / oldNumber) * 100;
	// 	console.log("result", result);
	// 	return result;
	// };

	findNewHeight = () => {
		return this.state.locationData.map(i => i.year[this.state.year])[0];
	};

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
					cycleYearData={this.cycleYearData}
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
