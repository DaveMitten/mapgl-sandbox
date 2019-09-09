import React, { Component } from "react";
import locationAndPostcode from "../../dummyData/locationAndPostcode.json";
import locationPriceYear from "../../dummyData/locationPriceYear.json";

class PostcodeConverter extends Component {
	componentDidMount() {
		this.sortData(this.setDataObj);
	}

	sortData = callback => {
		const mapped = locationPriceYear.YLP.map(i => Object.values(i));
		const result = mapped.map(i => {
			console.log(i);
			const mapLocalAndPost = i.map(j => {
                const location = j.location;
                
				const postcodeMatcher = Object.entries(locationAndPostcode).map(i => {
					const local = i[0];
					const post = i[1];
					return [local, post, "steve"];
                });
                
        // for some reasn the above array is beying returned opposed to he 'obj' from down below. 
        // I don't see why or understand why this is happening. Need to test further why this is being returned here


				const matchAndCreateNewObj = postcodeMatcher.filter(element => {
					if (element[0] === location) {
						const obj = Object.assign({
							location,
							postcode: element[1],
							price: j.price
						});
						console.log("obj", obj);
						return obj;
                    }
                });
                console.log('matchAndCreateNewObj', matchAndCreateNewObj)
                return matchAndCreateNewObj

            });
            console.log('mapLocalAndPost', mapLocalAndPost)
            return mapLocalAndPost;
		});
		callback(result);
	};

	setDataObj = obj => {
		this.setState({ obj });
	};

	render() {
		console.log("this.state", this.state);
		return <div>{this.state && JSON.stringify(this.state)}</div>;
	}
}

export default PostcodeConverter;
