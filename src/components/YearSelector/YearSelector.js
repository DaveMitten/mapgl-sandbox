import React from "react";
import "./YearSelector.css";

const YearSelector = ({ yearOnChange, years, cycleYearData }) => {
	return (
		<>
			<form className="yearSelector">
				Year:{" "}
				<select onChange={yearOnChange}>
					{years &&
						years.map(i => {
							return (
								<option key={i} value={i.slice(2)}>
									{i}
								</option>
							);
						})}
				</select>
			</form>
			<button className="playButton" onClick={cycleYearData}>Play</button>
		</>
	);
};

export default YearSelector;
