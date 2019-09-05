import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertToCelsius, calculateWind } from "../helper-functions/functions";

const MoreInfo = props => {
	const [imageUrl, setImageUrl] = useState("");

	const handleInput = (e) => {
		setImageUrl(e.target.value);
	}

	return (
		<div className="more-info">
			<div className="more-info-details">
				<h4>CURRENT OBSERVATIONS FOR {props.city.name.toUpperCase()}</h4>
				<p>WEATHER: {props.city.weatherData.list[0].weather[0].description}</p>
				<p>TEMPERATURE: {convertToCelsius(props.city.weatherData.list[0].main.temp)}°</p>
				{ props.city.weatherData.list[0].rain &&  <p>RAIN IN LAST 3 HOURS: { props.city.weatherData.list[0].rain["3h"] }mm</p>}
				{ props.city.weatherData.list[0].snow &&  <p>SNOW IN LAST 3 HOURS: { props.city.weatherData.list[0].snow["3h"] }mm</p>}
				<p>WIND: {calculateWind(props.city.weatherData.list[0].wind.speed)} knots</p>
				<p>HUMIDITY: {props.city.weatherData.list[0].main.humidity}%</p>
				<p>CLOUDINESS: {props.city.weatherData.list[0].clouds.all}%</p>
				<p>PRESSURE: {props.city.weatherData.list[0].main.pressure}hpa</p>
				
				<form onSubmit={(e) => {
					props.changeBackgroundPic(e, props.city, imageUrl);
					setImageUrl("");
					}
				}>
					<p>Want to customise this background?</p>
					<input type="text" value={imageUrl} placeholder="ENTER PIC URL!" onChange={(e) => handleInput(e)}></input><button>UPLOAD</button>
				</form>
				<FontAwesomeIcon icon="minus-circle" size="lg" className="close-details" onClick={props.closeMoreInfo} />
			</div>
		</div>
	)
}

export default MoreInfo; 