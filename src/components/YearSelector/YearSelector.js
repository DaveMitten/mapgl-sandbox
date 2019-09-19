import React, { Component } from "react";
import "./YearSelector.css";

class YearSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	sortAndLabel = i => {
		const addLabel = (i.startsWith("9") ? "19" : "20") + i;
		return addLabel;
	};

	// playFunctionArr = () => {
	// 	const result =
	// 		this.props.dataSet
	// 		&&
	// 		this.props.dataSet.map(i => {
	// 			console.log('i', i)
	// 			// Object.keys(Object.values(i)[2])
	// 				// .map(i => (i.startsWith(9) ? 19 + i : 20 + i))
	// 				// .sort();
	// 		});
	// 	console.log("result", result);
	// 	return result;
	// };

	// settingState = () => {
	// 	this.setState({
	// 		years: this.props.yearArr.length > 0 && this.props.yearArr
	// 	});
	// };

	render() {
		console.log("this.props.years", this.props.years);
		return (
			<>
				<form className="yearSelector">
					<select onChange={this.props.yearOnChange}>
						{this.props.years &&
							this.props.years.map(i => {
								return <option value={i.slice(2)}>{i}</option>;
							})}
					</select>
					{/* {`Year: ${this.props.year}`} */}

					{/* <div>
						<label>
							<input
								type="radio"
								name="dateSelect"
								value="0"
								checked={this.props.year === "0"}
								onChange={this.props.yearOnChange}
							/>
							Jan 95
						</label>
					</div>
					<div>
						<label>
							<input
								type="radio"
								name="dateSelect"
								value="1"
								onChange={this.props.yearOnChange}
							/>
							Jan 00
						</label>
					</div>
					<div>
						<label>
							<input
								type="radio"
								name="dateSelect"
								value="2"
								onChange={this.props.yearOnChange}
							/>
							Jan 05
						</label>
					</div> */}
					{/* {`Year: ${this.date[this.props.year]}`} */}
					{/* <button
					style={{ margin: "10px", borderRadius: "10px" }}
					onClick={this.props.dataStateChange}
				> */}
				</form>
				{/* <button
				className="yearSelector"
					style={{ margin: "10px", borderRadius: "10px", background: 'white' }}
					onClick={this.props.dataStateChange}
				>
					Data Change
				</button> */}
			</>
		);
	}
}

export default YearSelector;
