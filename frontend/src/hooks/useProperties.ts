import { useEffect, useState } from "react";
import { FilterOptions, Property } from "../interfaces/interfaces";

const url = "https://localhost:8000/properties";

export default function useProperties(filterOptions: FilterOptions) {
	const [data, setData] = useState<Property[]>([]);
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async function () {
			try {
				setLoading(true);

				const queryString =
					"?propertyType=" +
					filterOptions.realEstateType +
					"&viewport=" +
					JSON.stringify(filterOptions.viewport).slice(1, -1);

				const response = await fetch(url + queryString);
				const newData = await response.json();
				setData(newData);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		})();
	}, [filterOptions.realEstateType, filterOptions.viewport]);

	return { data, error, loading };
}
