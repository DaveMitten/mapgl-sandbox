import React from "react";
import "./YearSelector.css";

const YearSelector = ({ yearOnChange, years }) => {
	return (
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
	);
};

export default YearSelector;
