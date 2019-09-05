import { useState, useEffect } from "react";

// CUSTOM HOOK!
export const useHttp = (url, dependencies) => {

	const [isLoading, setIsLoading] = useState(false);
	const [fetchedData, setFetchedData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		// console.log("Using HTTP Hook");
		setIsLoading(true);
		fetch(url)
			.then(res => {
				if (!res.ok) {
					setIsLoading(false);
					setError("No city with this name!");
					// return error;
					// throw new Error("Failed to fetch!");
				}
				return res.json();
			})
			.then(data => {
				setFetchedData(data);
				setIsLoading(false);
			})
	}, dependencies);

	return [isLoading, fetchedData, error];
}






