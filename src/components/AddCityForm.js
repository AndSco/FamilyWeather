import React, { useState, useEffect, useCallback } from "react";
import { filterCityList } from "../helper-functions/functions";
import { removeCityDuplicates } from "../helper-functions/functions";
import Autocompletion from "./Autocompletion";

const AddCityForm = props => {

	const [cityName, setCityName] = useState("");
  const [matches, setMatches] = useState([]);
  const {cityList} = props;

	const handleChange = (e) => {
		setCityName(e.target.value)
	}


	const startAutoComplete = useCallback(() => {
		const filteredResults = filterCityList(cityName, cityList);
		const uniqueResults = removeCityDuplicates(filteredResults);
		return uniqueResults;
	}, [cityName, cityList])


	useEffect(() => {
		if (cityName.length > 2) {
			setMatches(startAutoComplete());
		} else {
			setMatches([]);
		}
	}, [cityName, startAutoComplete])



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