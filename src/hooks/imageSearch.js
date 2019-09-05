import { useState, useEffect } from "react";


export const useSetupImage = (city, dependencies) => {
	const [isLoading, setIsLoading] = useState(false);
	const [photoUrl, setPhotoUrl] = useState(city.imageUrl);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		if (city.imageUrl || city.startingStock) {
			setIsLoading(false);
			setPhotoUrl(city.imageUrl);
		}
		else {
			const formattedCityName = city.name.split(" ").join("-").toLowerCase();
			const url = `https://api.teleport.org/api/urban_areas/slug:${formattedCityName}/images/`;
			fetch(url)
				.then(res => {
					if (!res.ok) {
						setIsLoading(false);
						setError("No images for this city!");
					}
					return res.json()
				})
				.then(data => {	
					setIsLoading(false);
					if (data.status === 404) {
						setPhotoUrl(null);
					} else {
						setPhotoUrl(data.photos[0].image.mobile);
					}	
				})
		}		
	}, dependencies);

	return [isLoading, photoUrl, error];
}


