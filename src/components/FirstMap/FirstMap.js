import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
	accessToken:
		"pk.eyJ1Ijoiam5hbGV4YW5kZXIxMCIsImEiOiJjaWlobnE4eGswMDFld2RtNmZxMDl3Nzc3In0.UTaIFjrs21qB1npSeliZbQ"
});
const zoom = [8];
const mapStyle = "mapbox://styles/jnalexander10/cj0xo73a300rr2rta4ny2bj0d/";


class FirstMap extends Component {

	render() {
		return (
			<div>
				<Map
					style={mapStyle}
					zoom={zoom}
					containerStyle={{
						height: "100%",
						width: "500px"
					}}
				>
					<Layer
						type="symbol"
						id="marker"
						layout={{ "icon-image": "marker-15" }}
					>
						<Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
					</Layer>
				</Map>
			</div>
		);
	}
}

export default FirstMap;
