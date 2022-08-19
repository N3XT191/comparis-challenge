import React, { Component } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileWMS from "ol/source/TileWMS";
import { Tile as TileLayer } from "ol/layer";
import { ScaleLine, defaults as defaultControls } from "ol/control";

import "ol/ol.css";

let layers = [
	new TileLayer({
		preload: Infinity,
		source: new TileWMS({
			crossOrigin: "anonymous",
			params: {
				LAYERS: "ch.swisstopo.swissimage-product_1946",
				FORMAT: "image/jpeg",
			},
			url: "https://wms.geo.admin.ch/",
			attribution: "swisstopo",
			serverLayerName: "ch.swisstopo.swissimage-product_1946",
			attributionUrl:
				"https://www.swisstopo.admin.ch/internet/swisstopo/fr/home.html",
			timestamps: ["current"],
			label: "ch.swisstopo.swissimage-product_1946",
			type: "wmts",
		}),
	}),
];

var extent = [2420000, 130000, 2900000, 1350000];

class PublicMap extends Component {
	constructor(props) {
		super(props);

		this.state = { popoverText: "" };

		this.olmap = new Map({
			extent: extent,
			target: null,
			layers: layers,
			view: new View({
				center: [960000, 5982000],
				zoom: 12,
				minZoom: 8,
				maxZoom: 19,
			}),
			controls: defaultControls().extend([new ScaleLine()]),
		});
	}

	componentDidMount() {
		this.olmap.setTarget("map");
	}

	render() {
		return (
			<div>
				<div
					id="map"
					style={{
						width: "99vw",
						height: "98vh",
					}}
				></div>
			</div>
		);
	}
}

export default PublicMap;
