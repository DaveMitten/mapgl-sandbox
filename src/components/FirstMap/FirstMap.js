import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import DeckGL from "@deck.gl/react";
import { geoToH3 } from "h3-js";
import YearSelector from "../YearSelector/YearSelector";
import dataSet from "../finalDataSet/finalDataSet.json";

const MAPBOX_TOKEN =
    "pk.eyJ1Ijoiam5hbGV4YW5kZXIxMCIsImEiOiJjaWlobnE4eGswMDFld2RtNmZxMDl3Nzc3In0.UTaIFjrs21qB1npSeliZbQ";

const mapStyle =
    "mapbox://styles/jnalexander10/cj0xo73a300rr2rta4ny2bj0d/draft/";

const INITIAL_VIEW_STATE = {
    longitude: 0.1278,
    latitude: 51.5074,
    zoom: 9,
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
            year: 99,
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
    }

    findNewHeight = () => {
        return (
            this.state.locationData &&
            this.state.locationData.map(i => i.year[this.state.year])[0] / 1000
        );
    };

    yearOnChange = e => {
        const theCurrentYear = e.currentTarget.value;
        this.setState({
            year: theCurrentYear
        });
        const setElevationScale = () => {
            const newHeight = this.findNewHeight();
            const newElevationScale = Math.ceil(newHeight);
            this.setState({
                newElevationScale: newElevationScale
            });
        };
        setElevationScale();
        // this.checkScaleMaxStop(this.incrementScale);
    };

    _animate() {
        this._stopAnimate();
        // wait 6 secs to start animation so that all data are loaded
        this.startAnimationTimer = window.setTimeout(this._startAnimate, 8000);
    }

    _startAnimate() {
        this.intervalTimer = window.setInterval(this._animateHeight, 50);
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
                getElevation: d => Number(d.price / 500)
            })
        ];
    };

    sortYears = () => {
        return dataSet.map(i => {
            return Object.keys(Object.values(i)[2])
                .map(i => (i.startsWith(9) ? 19 + i : 20 + i))
                .sort();
        })[0];
    };

    render() {
        return <div style={
            {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        } >
            <YearSelector
                yearOnChange={this.yearOnChange}
                year={this.state.year}
                cycleYearData={this.cycleYearData}
                dataStateChange={this.dataStateChange}
                dataSet={dataSet}
                years={this.state.yearArr && this.state.yearArr}
            />
            <DeckGL 
                layers={this._layerRendering()}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true} >
                <StaticMap
                    reuseMaps
                    mapStyle={mapStyle}
                    MapController preventStyleDiffing={true}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                /> 
            </DeckGL>
        </div>

    }
}

export default FirstMap;