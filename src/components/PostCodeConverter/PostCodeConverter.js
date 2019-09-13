export default function getPostcodes(postcodes) {
	const jsonified = JSON.stringify(postcodes);
	console.log("postcodes", jsonified);

	fetch(`https://api.postcodes.io/${jsonified}`)
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
