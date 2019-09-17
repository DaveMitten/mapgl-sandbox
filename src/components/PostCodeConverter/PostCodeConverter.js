export default function getPostcodes(postcodes) {
	const jsonified = JSON.stringify(postcodes);
	console.log("postcodes", jsonified);

	fetch(`https://api.postcodes.io/${jsonified}`, {
		method: "GET",
		"Access-Control-Allow-Origin": "localhost:3000",
		"Access-Control-Request-Headers": "GET",
		"Content-Type": "application/json",
		"Access-Control-Allow-Methods": "*"
	})
		.then(data => {
			console.log("data from the postcode api", data);
		})
		.catch(error => {
			console.log("error", error);
		});

	return null;
}

// {
// 	"postcodes" : ["OX49 5NU", "M32 0JG", "NE30 1DP"]
// 	}


// export const locationTOH3Match = (h3, location) => {
// console.log('h3', h3);
// console.log('location', location);
	//simply put, if h3.location === location.location add h3.h3Location
	//  to location {
	// {
	//     "location": "Redbridge",
	//     "postcode": "IG6 1NA",
	// 	   "h3Location": ""
	//     "price": "72190",
	//     "year": {
	//         "10": "245067",
	//         "11": "265383",
	//         "12": "257635",
	//         "13": "262875",
	//         "14": "289684",
	//         "15": "325048",
	//         "16": "371307",
	//         "17": "408457",
	//         "18": "421816",
	//         "19": "423112",
	//         "95": "72190",
	//         "96": "72861",
	//         "97": "78163",
	//         "98": "91622",
	//         "99": "96338",
	//         "00": "115193",
	//         "01": "131477",
	//         "02": "153608",
	//         "03": "195246",
	//         "04": "212380",
	//         "05": "226922",
	//         "06": "232310",
	//         "07": "252230",
	//         "08": "275150",
	//         "09": "227450"
	//     }
	// },
	// }
	// Would look like this h3Location: h3.location
// };
