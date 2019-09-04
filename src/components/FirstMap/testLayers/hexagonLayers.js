import DeckGL from "@deck.gl/react";
import { H3HexagonLayer } from "@deck.gl/geo-layers";

const App = ({ data, viewport }) => {
	/**
	 * Data format:
	 * [
	 *   {
	 *     hex: '88283082b9fffff',
	 *     count: 96
	 *   },
	 *   ...
	 * ]
	 */
	const layer = new H3HexagonLayer({
		id: "h3-hexagon-layer",
		data,
		pickable: true,
		wireframe: false,
		filled: true,
		extruded: true,
		elevationScale: 20,
		getHexagon: d => d.hex,
		getFillColor: d => [255, (1 - d.count / 500) * 255, 0],
		getElevation: d => d.count,
		onHover: ({ object, x, y }) => {
			const tooltip = `${object.hex} count: ${object.count}`;
			/* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
		}
	});

	return <DeckGL {...viewport} layers={[layer]} />;
};
