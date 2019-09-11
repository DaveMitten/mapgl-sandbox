import React, { Component } from "react";
// import data from "../../dummyData/finalDataSet.json";
// import compiledData from "../../dummyData/dataWithYearPriceInfo.json";

class DataConversion extends Component {
	// getPostcodes = () => {
	// 	fetch("https://api.postcodes.io").then(data => data);
	// };

	// this.addYears();
	// this.addYears(this.addPriceToYearObj);

	// removeDuplicates = (myArr, prop) => {
	// 	return myArr.filter((obj, pos, arr) => {
	// 		return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
	// 	});
	// };

	// addYears = () => {
	// 	const uniqueAddresses = Array.from(new Set(data.map(a => a.postcode))).map(
	// 		id => {
	// 			return data.find(a => a.postcode === id);
	// 		}
	// 	);
	// 	uniqueAddresses.map(i => {
	// 		return (i["year"] = {
	// 			"95": "",
	// 			"96": "",
	// 			"97": "",
	// 			"98": "",
	// 			"99": "",
	// 			"00": "",
	// 			"01": "",
	// 			"02": "",
	// 			"03": "",
	// 			"04": "",
	// 			"05": "",
	// 			"06": "",
	// 			"07": "",
	// 			"08": "",
	// 			"09": "",
	// 			"10": "",
	// 			"11": "",
	// 			"12": "",
	// 			"13": "",
	// 			"14": "",
	// 			"15": "",
	// 			"16": "",
	// 			"17": "",
	// 			"18": "",
	// 			"19": ""
	// 		});
	// 	});
	// 	// callback(uniqueAddresses);
	// 	return uniqueAddresses;
	// };
	// addPriceToYearObj = yearObj => {
	// 	yearObj.map(a => {
	// 		console.log('a', a)
	// 	});
	// };
	//find the data baased on location
	// then when the match has been found, run the year agaisnt the year
	// whatever that match is, add the price to the newer data set

	// findLocationYearAddPrice = () => {
	// 	// console.log('compiledData', compiledData.map(i => i.location))
	// 	// console.log('data', data.map(i => i.location))
	// 	compiledData.map(i => {
	// 		data.map(j => {
	// 			if (i.location === j.location) {
	// 				Object.keys(i.year).filter(k => {
	// 					if (k === j.year) {
	// 						// console.log('k', k)
	// 						console.log('k', k.price, 'compliedData[k]', j.year.k)
	// 						// j.year.k = k.price

	// 					}
	// 					return '';
	// 					//  console.log('undefined this', k)
	// 				});
	// 			}
	// 		});
	// 	});
	// };

	// findLocationYearAddPrice = () => {
	// 	compiledData.map(compiledDataObj => {
	// 		const objectsWithSameLocation = data.filter(dataObj => {
	// 			return dataObj.location === compiledDataObj.location;
	// 		});
	// 		objectsWithSameLocation.map(obj => {
	// 			compiledDataObj.year[obj.year] = obj.price;
	// 		});
	// 	});
	// };

	render() {
		// this.findLocationYearAddPrice();
		// console.log(compiledData);
		return <div></div>;
	}
}

export default DataConversion;
