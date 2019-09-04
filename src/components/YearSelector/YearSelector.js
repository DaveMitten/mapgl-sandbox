import React, { Component } from "react";

import "./YearSelector.css";

class YearSelector extends Component {
	date = {
		0: "Jan 95",
		1: "Jan 00",
		2: "Jan 05"
	};
	render() {
		return (
			<form className="yearSelector">
				<div>
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
				</div>
				{`Year: ${this.date[this.props.year]}`}
			</form>
		);
	}
}

export default YearSelector;
