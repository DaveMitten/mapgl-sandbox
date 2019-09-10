import React, { Component } from "react";
import data from "../../dummyData/finalDataSet.json";

class PostcodeConverter extends Component {
	getPostcodes = () => {
		fetch("https://api.postcodes.io").then(data => data);
	};

	componentDidMount() {
		this.addYears(this.addPriceToYearObj);
	}

	removeDuplicates = (myArr, prop) => {
		return myArr.filter((obj, pos, arr) => {
			return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
		});
	};

	addYears = callback => {
		const uniqueAddresses = Array.from(new Set(data.map(a => a.postcode))).map(
			id => {
				return data.find(a => a.postcode === id);
			}
		);
		uniqueAddresses.map(i => {
			return (i["year"] = {
				1995: "",
				1996: "",
				1997: "",
				1998: "",
				1999: "",
				2000: "",
				2001: "",
				2002: "",
				2003: "",
				2004: "",
				2005: "",
				2006: "",
				2007: "",
				2008: "",
				2009: "",
				2010: "",
				2011: "",
				2012: "",
				2013: "",
				2014: "",
				2015: "",
				2016: "",
				2017: "",
				2018: "",
				2019: ""
			});
		});
		callback(uniqueAddresses);
		return uniqueAddresses;
	};

	addPriceToYearObj = yearObj => {
		yearObj.map(a => {
            














			return {
				location: a.location,
				postcode: a.postcode,
				year: {
					1995: a.year === "95" ? a.price : "",
					1996: a.year === "96" ? a.price : "",
					1997: a.year === "97" ? a.price : "",
					1998: a.year === "98" ? a.price : "",
					1999: a.year === "99" ? a.price : "",
					2000: a.year === "00" ? a.price : "",
					2001: a.year === "01" ? a.price : "",
					2002: a.year === "02" ? a.price : "",
					2003: a.year === "03" ? a.price : "",
					2004: a.year === "04" ? a.price : "",
					2005: a.year === "05" ? a.price : "",
					2006: a.year === "06" ? a.price : "",
					2007: a.year === "07" ? a.price : "",
					2008: a.year === "08" ? a.price : "",
					2009: a.year === "09" ? a.price : "",
					2010: a.year === "10" ? a.price : "",
					2011: a.year === "11" ? a.price : "",
					2012: a.year === "12" ? a.price : "",
					2013: a.year === "13" ? a.price : "",
					2014: a.year === "14" ? a.price : "",
					2015: a.year === "15" ? a.price : "",
					2016: a.year === "16" ? a.price : "",
					2017: a.year === "17" ? a.price : "",
					2018: a.year === "18" ? a.price : "",
					2019: a.year === "19" ? a.price : ""
				}
			};
		});
	};

	render() {
		console.log("data", data);
		return <div></div>;
	}
}

export default PostcodeConverter;
