import React, { Component } from 'react'

import "./YearSelector.css";


class YearSelector extends Component {
    render() {
        return (
               <form className="yearSelector">
					<div>
						<label>
							<input
								type="radio"
								name="react-tips"
								value="1"
								onChange={this.props.yearOnChange}
							/>
							Option One
						</label>
					</div>

					<div>
						<label>
							<input
								type="radio"
								name="react-tips"
								value="2"
								onChange={this.props.yearOnChange}
							/>
							Option Two
						</label>
					</div>

					<div>
						<label>
							<input
								type="radio"
								name="react-tips"
								value="3"
								onChange={this.props.yearOnChange}
							/>
							Option Three
						</label>
					</div>
				</form> 
        )
    }
}

export default YearSelector;
