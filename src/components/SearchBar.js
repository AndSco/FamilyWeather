import React, { useState, useEffect } from "react";
import { filterCityList } from "../helper-functions/functions";
import { removeCityDuplicates } from "../helper-functions/functions";
import Autocompletion from "./Autocompletion";

const SearchBar = props => {
  const [placeToSearch, setPlaceToSearch] = useState("");
  const [matches, setMatches] = useState([]);

  const handleChange = e => {
    setPlaceToSearch(e.target.value);
  };

  useEffect(() => {
    if (placeToSearch.length > 2) {
      const filteredResults = filterCityList(placeToSearch, props.cityList);
      const uniqueResults = removeCityDuplicates(filteredResults);
      setMatches(uniqueResults);
    } else {
      setMatches([]);
    }
  }, [placeToSearch, props.cityList]);

  return (
    <div>
      <form
        className="search-bar"
        onSubmit={e => {
          e.preventDefault();
          if (placeToSearch === "") return;
          props.addNewCity(e, { name: placeToSearch.toLowerCase() });
          setPlaceToSearch("");
          props.closeSearchBar();
          props.handleSearching();
        }}
      >
        <input
          type="text"
          placeholder="SEARCH LOCATION"
          value={placeToSearch}
          onChange={handleChange}
        />
      </form>
      {matches.length > 0 && (
        <Autocompletion
          matches={matches}
          addNewCity={props.addNewCity}
          closeSearchBar={props.closeSearchBar}
          handleSearching={props.handleSearching}
        />
      )}
    </div>
  );
};

export default SearchBar;
