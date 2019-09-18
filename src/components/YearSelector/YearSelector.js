import React, { Component } from "react";
import "./YearSelector.css";

class YearSelector extends Component {
	sortAndLabel = i => {
		const addLabel = (i.startsWith("9") ? "19" : "20") + i;
		return addLabel;
	}
	render() {
		return (
			<>
				<form className="yearSelector">
					<select onChange={this.props.yearOnChange}>
						{this.props.dataSet &&
							Object.keys(this.props.dataSet[0]["year"]).map(i => (
								<option value={i}>
									{this.sortAndLabel(i)}
								</option>
							))}

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
