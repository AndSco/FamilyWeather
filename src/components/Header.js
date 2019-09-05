import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = props => {
	return (
		<div className="forecast header">
			<h2 className="title">Family<span className="title-part">Weather+</span></h2>
			<div className="title-icons">
				<span className="sort-icon">
					<FontAwesomeIcon icon="sun" size="4x" onClick={props.sortByHeat} />
					<div className="icon-label">Who's sweating <span role="img" aria-label="hot">🥵</span></div>
				</span>
				<span className="sort-icon">
					<FontAwesomeIcon icon="snowflake" size="4x" onClick={props.sortByCold} />
					<div className="icon-label">Who's freezing <span role="img" aria-label="cold">🥶</span></div>
				</span>
				<span className="sort-icon">
					<FontAwesomeIcon icon="cloud-rain" size="4x" onClick={props.sortByRain} />
					<div className="icon-label">Where's pouring <span role="img" aria-label="rain">☔</span></div>
				</span>
				<span className="sort-icon">
					<FontAwesomeIcon icon="wind" size="4x" onClick={props.sortByWind} />
					<div className="icon-label">Where's blowing <span role="img" aria-label="wind">⛵</span></div>
				</span>
			</div>
		</div>
	)
}


export default Header;