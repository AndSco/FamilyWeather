import React, { useState, useEffect } from "react";
import { filterCityList } from "../helper-functions/functions";
import { removeCityDuplicates } from "../helper-functions/functions";
import Autocompletion from "./Autocompletion";

const AddCityForm = props => {

	const [cityName, setCityName] = useState("");
	// const [countryCode, setCountryCode] = useState("");
	// const [moreDetails, setMoreDetails] = useState(false);

	const [matches, setMatches] = useState([]);


	const handleChange = (e) => {
		setCityName(e.target.value)
	}


	const startAutoComplete = () => {
		const filteredResults = filterCityList(cityName, props.cityList);
		const uniqueResults = removeCityDuplicates(filteredResults);
		// console.log("uniqueResults", uniqueResults);
		return uniqueResults;
	}


	useEffect(() => {
		if (cityName.length > 2) {
			setMatches(startAutoComplete());
		} else {
			setMatches([]);
		}
	}, [cityName])


	// useEffect(() => console.log("matches", matches), [matches]);

	return (
		<div className="forecast add-city-form">
			<input type="text" placeholder="SEARCH A CITY!" value={cityName} onChange={(e) => handleChange(e)} />	
			{ matches.length > 0 && <Autocompletion 
					matches={matches} 
					addNewCity={props.addNewCity} 
					closeSearchBar={props.closeSearchBar} 
					handleSearching={props.handleSearching}
				/>
			}
		</div>
	)
}

export default AddCityForm;