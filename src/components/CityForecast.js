import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http";
import { useSetupImage } from "../hooks/imageSearch";
import { convertToCelsius, calculateWind, formatDate } from "../helper-functions/functions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from "./Loading";
import ErrorBox from "./Error";
import MoreInfo from "./MoreInfo";



const CityForecast = props => {
	const { city, insertWeatherData, insertImageData } = props;

	// Fetch forecast data w custom hook
	const url = city.countryCode !== ""
		?
		`https://api.openweathermap.org/data/2.5/forecast?q=${city.name},${city.countryCode}&APPID=6c2959ac5f06da24a0df472b94e4fd35`
		:
		`https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&APPID=6c2959ac5f06da24a0df472b94e4fd35`;

	const [isLoading, forecastData, error] = useHttp(url, []);
  const [currentData, setCurrentData] = useState(0); 

// Placing data in array of objects 
	const cityData = city.weatherData
		?
		city.weatherData.city
		:
		null;


	const weatherData = city.weatherData
		?
		city.weatherData.list.map(hourlyChunk => {
				return {
					main: hourlyChunk.main, 
					weather: hourlyChunk.weather, 
					wind: hourlyChunk.wind,
					date: hourlyChunk.dt_txt
				}
			}
		) 
		: 
		null;	


		const currentWeather = city.weatherData 
			?
			weatherData[currentData]
			:
			null;
	

	useEffect(() => {
    if (forecastData) insertWeatherData(city, forecastData);
  }, [forecastData, insertWeatherData, city]);


	// TO FETCH PICTURE - TeleportAPI (using same custom hook)
	// const formattedCityName = city.name.split(" ").join("-").toLowerCase();
	// const urlPicture = `https://api.teleport.org/api/urban_areas/slug:${formattedCityName}/images/`; // if city has custom image, don't search
	

	// FETCH PICTURE WITH NEW CUSTOM HOOK, conditionally defined if city has already an image or not (or is in starting stock)!
	const [isPictureRequestLoading, pictureUrl, pictureError] = useSetupImage(city, []);

	
		
	// Send the image URL to cities array of objects, and will be static background, 
	// Do this only if its pictureUrl changes
	useEffect(() => {
		insertImageData(city, pictureUrl);
	}, [pictureUrl, city, insertImageData]);



	// Helper functions
	const moveForward = () => {
		if (currentData >= 39) return; // max length of time chunks!
		setCurrentData(currentData + 1);
	}

	const moveBackward = () => {
		if (currentData === 0) return;
		setCurrentData(currentData - 1);
	}




	// DRAGGING!

	const onDragStart = (e, element) => {
		console.log("dragstart on city", element);
		if (window.navigator.userAgent.indexOf("Edge") > -1) {
			e.dataTransfer.setData(`text/plain`, element);
		}
		else {
			e.dataTransfer.setData("cityMoved", element)
		};
	}

	const onDragOver = (e) => {
	    e.preventDefault();
	}

	const onDrop = (e, cat) => {
		const cityToMove = !window.navigator.userAgent.indexOf("Edge") > -1 ? e.dataTransfer.getData("cityMoved") : e.dataTransfer.getData("text");
		const cityToMoveTo = e.currentTarget.className.slice(9);
		props.handleDragging(cityToMove, cityToMoveTo);
	}


	// To open-close More info panel!
	const [moreInfo, setMoreInfo] = useState(false);

	const closeMoreInfo = () => {
		setMoreInfo(false);
	}


	return !isLoading && forecastData && !error ? (
    <div
      className={`forecast ${city.name}`}
      style={
        !city.startingStock && props.city.imageUrl
          ? { backgroundImage: `url(${props.city.imageUrl})` }
          : null
      }
      draggable
      onDragStart={e => onDragStart(e, city.name)}
      onDragOver={e => onDragOver(e)}
      onDrop={e => onDrop(e)}
      onClick={props.closeSearchBar}
    >
      {moreInfo ? (
        <MoreInfo
          city={city}
          closeMoreInfo={closeMoreInfo}
          changeBackgroundPic={props.changeBackgroundPic}
        />
      ) : (
        <div
          className="actualForecast"
          onTouchStart={e => console.log("touching!", e)}
        >
          <div className="clickable-arrow left-arrow" onClick={moveBackward}>
            {currentData !== 0 && (
              <FontAwesomeIcon
                icon="chevron-circle-left"
                size="2x"
                className="chevron"
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
          <div className="details">
            <h1>
              {cityData.name.toUpperCase()}, {cityData.country.toUpperCase()}
            </h1>
            <p className="icon">
              <img
                alt="weather conditions"
                src={require(`../images/weather-icons/${currentWeather.weather[0].id}.png`)}
              />
            </p>
            <p className="forecast-summary">
              <FontAwesomeIcon icon="thermometer-full" />{" "}
              {convertToCelsius(currentWeather.main.temp)}° -{" "}
              {currentWeather.weather[0].description.toUpperCase()}
            </p>
            <p>
              <FontAwesomeIcon icon="wind" />{" "}
              {calculateWind(currentWeather.wind.speed)}KN{" "}
              <FontAwesomeIcon
                icon="arrow-down"
                transform={{ rotate: currentWeather.wind.deg }}
              />
            </p>
            <p className="date-details">
              <FontAwesomeIcon icon="calendar-week" />{" "}
              {formatDate(currentWeather.date).date} &nbsp;{" "}
              <FontAwesomeIcon icon="clock" />{" "}
              {formatDate(currentWeather.date).hour}:00h
            </p>
          </div>
          <div
            className="clickable-arrow right-arrow"
            onClick={moveForward}
            style={{ cursor: "pointer" }}
          >
            {currentData < 39 && (
              <FontAwesomeIcon
                icon="chevron-circle-right"
                size="2x"
                className="chevron"
              />
            )}
          </div>
          <FontAwesomeIcon
            icon="times-circle"
            onClick={() => props.removeCity(city.name.toLowerCase())}
            size="lg"
            className="close-window"
            style={{ cursor: "pointer" }}
          />
          <FontAwesomeIcon
            icon="plus-circle"
            size="lg"
            className="open-details"
            onClick={() => setMoreInfo(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
    </div>
  ) : isLoading && !error ? (
    <Loading />
  ) : error ? (
    <ErrorBox error={error} />
  ) : null;
}

export default CityForecast;