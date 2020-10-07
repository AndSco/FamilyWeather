import React, { useState, useEffect } from "react";
import CityForecast from "./CityForecast";
import Header from "./Header";
import AddCity from "./AddCity";
import AddCityForm from "./AddCityForm";
import Introduction from "./Introduction";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForecastList = props => {
  const startingCities = [
    {
      name: "brno",
      countryCode: "cz",
      startingStock: true
    },
    {
      name: "turin",
      countryCode: "it",
      startingStock: true
    },
    {
      name: "pernink",
      countryCode: "cz",
      startingStock: true
    },
    {
      name: "sanremo",
      countryCode: "it",
      startingStock: true
    },
    {
      name: "milan",
      countryCode: "it",
      startingStock: true
    },
    {
      name: "firenze",
      countryCode: "it",
      startingStock: true
    },
    {
      name: "perinera",
      countryCode: "it",
      startingStock: true
    },
    {
      name: "valletta",
      countryCode: "mt",
      startingStock: true
    },
    {
      name: "barletta",
      countryCode: "it",
      startingStock: true
    }
  ];

  const isFirstVisit = localStorage.getItem("already-visited") ? false : true;
  const [firstTimeVisit, setFirstTimeVisit] = useState(isFirstVisit); // to show instructions first time
  const closeIntro = () => {
    setFirstTimeVisit(false);
    localStorage.setItem("already-visited", true);
  };
  // useEffect()

  const [cities, setCities] = useState(
    localStorage.getItem("cities")
      ? JSON.parse(localStorage.getItem("cities"))
      : startingCities
  );
  const [adding, setAdding] = useState(false);

  // Complete city list for autocomplete
  const [cityList, setCityList] = useState(null);

  useEffect(() => {
    fetch("json/city-list-min.json")
      .then(response => response.json())
      .then(data => setCityList(data));
  }, []);

  // To toggle search bar
  const [openSearch, setOpenSearch] = useState(false);

  // To trigger scroll to last block after a search has been performed
  const [hasSearched, setHasSearched] = useState(false);
  // useEffect(() => console.log(hasSearched), [hasSearched]);

  // Opens search FORM
  const openForm = city => {
    setAdding(true);
  };

  const addNewCity = (e, city) => {
    console.log("ADDING CITY", city);
    setCities([...cities, city]);
    setAdding(false);
    // .scrollIntoView({ behavior: "smooth" });
  };

  const removeCity = cityName => {
    console.log("removing city", cityName);
    const filteredList = cities.filter(
      city => city.name !== cityName.toLowerCase()
    );
    console.log("filteredList", filteredList);
    setCities(filteredList);
  };

  const closeSearchBar = () => {
    setOpenSearch(false);
  };

  const handleSearching = () => {
    setHasSearched(!hasSearched);
  };

  // Pass weather and image data to city objects array, so that the city list can be sorted

  const insertWeatherData = (city, data) => {
    const foundCity = cities.filter(
      entry =>
        entry.name === city.name && entry.countryCode === city.countryCode
    )[0];
    foundCity.weatherData = data;
    // setReceivedWeatherData(receivedWeatherData + 1);
  };

  const insertImageData = (city, url) => {
    const foundCity = cities.filter(
      entry =>
        entry.name === city.name && entry.countryCode === city.countryCode
    )[0];
    foundCity.imageUrl = url;
  };

  // SORTING FUNCTIONS, TRIGGERED BY HEADER ICONS

  const sortByCold = () => {
    return cities.sort(
      (a, b) =>
        a.weatherData.list[0].main.temp - b.weatherData.list[0].main.temp
    );
  };

  const sortByHeat = () => {
    return cities.sort(
      (a, b) =>
        b.weatherData.list[0].main.temp - a.weatherData.list[0].main.temp
    );
  };

  const sortByWind = () => {
    return cities.sort(
      (a, b) =>
        b.weatherData.list[0].wind.speed - a.weatherData.list[0].wind.speed
    );
  };

  const sortByRain = () => {
    const citiesWithRain = cities
      .filter(city => city.weatherData.list[0].rain !== undefined)
      .sort(
        (a, b) =>
          b.weatherData.list[0].rain["3h"] - a.weatherData.list[0].rain["3h"]
      );

    const citiesWithoutRain = cities.filter(
      city => city.weatherData.list[0].rain == undefined
    );
    const sortedList = [...citiesWithRain, ...citiesWithoutRain];
    setCities(sortedList);
  };

  // Change background pic - Need to add a key to specify that this entry will have its own custom pic, so that Teleport does not search for one!
  const changeBackgroundPic = (e, city, url) => {
    e.preventDefault();
    const listCopy = [...cities];
    const cityToEdit = listCopy.filter(entry => entry === city)[0];
    cityToEdit.imageUrl = url;
    // cityToEdit.customImage = true;
    setCities(listCopy);
  };

  // Recreates the list every time the component render
  useEffect(() => createList);

  const [onScreen, setOnScreen] = useState(null);

  const createList = () => {
    const listContructed = cities.map((city, index) => (
      <CityForecast
        key={index}
        city={city}
        removeCity={removeCity}
        citiesList={cities}
        insertWeatherData={insertWeatherData}
        insertImageData={insertImageData}
        handleDragging={handleDragging}
        changeBackgroundPic={changeBackgroundPic}
        closeSearchBar={closeSearchBar}
      />
    ));
    setOnScreen(listContructed);
  };

  // Save cities to local storage every time the list gets update
  useEffect(() => localStorage.setItem("cities", JSON.stringify(cities)), [
    cities
  ]);

  // IMPLEMENT DRAGGING! Find city to be removed, filter it out of array copy and re-insert it at the destimation index
  const handleDragging = (elementToMove, destination) => {
    const cityToMove = cities.filter(city => city.name === elementToMove)[0];
    const indexToMoveTo = cities.findIndex(city => city.name === destination);
    const filteredList = cities.filter(city => city !== cityToMove);
    filteredList.splice(indexToMoveTo, 0, cityToMove);
    console.log("filteredList", filteredList);
    setCities(filteredList);
  };

  return (
    <div className="list">
      <div
        className={openSearch ? "searching-div open-research" : "searching-div"}
      >
        <div className="search-icon" onClick={() => setOpenSearch(!openSearch)}>
          <FontAwesomeIcon
            icon={!openSearch ? "search" : "times-circle"}
            size="2x"
          />
        </div>
        {openSearch && (
          <SearchBar
            addNewCity={addNewCity}
            closeSearchBar={closeSearchBar}
            handleSearching={handleSearching}
            cityList={cityList}
          />
        )}
      </div>
      <Header
        sortByCold={sortByCold}
        sortByHeat={sortByHeat}
        sortByWind={sortByWind}
        sortByRain={sortByRain}
      />
      {firstTimeVisit && <Introduction closeIntro={closeIntro} />}
      {onScreen}
      {adding ? (
        <AddCityForm
          addNewCity={addNewCity}
          cityList={cityList}
          closeSearchBar={closeSearchBar}
          handleSearching={handleSearching}
        />
      ) : (
        <AddCity openForm={openForm} hasSearched={hasSearched} />
      )}
    </div>
  );
};

export default ForecastList;
