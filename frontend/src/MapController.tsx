import React, { useEffect, useCallback } from "react";
import { defaultCenter, defaultZoom } from "./MapWidget";

export function MapController({
	map,
	setViewPort,
	setRealEstateType,
}: {
	map: any;
	setViewPort: (viewport: number[]) => void;
	setRealEstateType: (type: "" | "House" | "Apartment") => void;
}) {
	const onClick = useCallback(() => {
		map.setView(defaultCenter, defaultZoom);
	}, [map]);

	const onMove = useCallback(() => {
		const bounds = map.getBounds();
		const viewport = [
			bounds._southWest.lat,
			bounds._southWest.lng,
			bounds._northEast.lat,
			bounds._northEast.lng,
		];
		setViewPort(viewport);
	}, [map]);

	useEffect(() => {
		map.on("moveend", onMove);
		return () => {
			map.off("moveend", onMove);
		};
	}, [map, onMove]);

	return (
		<p>
			<button onClick={onClick}>reset</button>
			<select
				onChange={(e) =>
					setRealEstateType(e.target.value as "" | "House" | "Apartment")
				}
			>
				<option value="">All</option>
				<option value="House">Houses</option>
				<option value="Apartment">Apartments</option>
			</select>
		</p>
	);
}
