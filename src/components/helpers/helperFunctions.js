
const _startAnimationTimer = null;
		
const intervalTimer = null;

export function _startAnimate(stateElevationScale, elevationScale) {
	this.intervalTimer = window.setInterval(
		this._animateHeight(stateElevationScale, elevationScale),
		10
	);
}

export function _stopAnimate() {
	window.clearTimeout(this.startAnimationTimer);
	window.clearTimeout(this.intervalTimer);
}

export function _animateHeight(stateElevationScale, elevationScale) {
	if (stateElevationScale === elevationScale.max) {
		this._stopAnimate();
	} else {
		this.setState({ elevationScale: stateElevationScale + 1 });
	}
}

export function _animate(stateElevationScale, elevationScale) {
	_stopAnimate();

	// wait 7 secs to start animation so that all data are loaded
	this.startAnimationTimer = window.setTimeout(
		this._startAnimate(stateElevationScale, elevationScale),
		7000
	);
}

