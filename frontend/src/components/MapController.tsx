import React, { useEffect, useCallback } from "react";
import { RealEstateFilterType } from "../interfaces/interfaces";
import { defaultCenter, defaultZoom } from "./App";

export function MapController({
	map,
	setViewPort,
	setRealEstateType,
	realEstateType,
}: {
	map: any;
	setViewPort: (viewport: number[]) => void;
	setRealEstateType: (type: RealEstateFilterType) => void;
	realEstateType: RealEstateFilterType;
}) {
	const onReset = useCallback(() => {
		map.setView(defaultCenter, defaultZoom);
		setRealEstateType("");
	}, [map, setRealEstateType]);

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
			<button onClick={onReset}>reset</button>
			<select
				onChange={(e) =>
					setRealEstateType(e.target.value as "" | "House" | "Apartment")
				}
				value={realEstateType}
			>
				<option value="">All</option>
				<option value="House">Houses</option>
				<option value="Apartment">Apartments</option>
			</select>
		</p>
	);
}
