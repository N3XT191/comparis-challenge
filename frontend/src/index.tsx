import React from "react";
import { render } from "react-dom";
import MapWidget from "./MapWidget";
import "./index.css";

const App = () => (
	<div>
		<MapWidget />
	</div>
);

render(<App />, document.getElementById("root"));
