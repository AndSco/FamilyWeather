import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Introduction = props => {
  return (
    <div className="forecast intro-instructions">
      <div className="intro-text">
        <p>WELCOME TO FAMILYWEATHER+</p>
        <p>
          Do your loved ones live spread around the globe? Or maybe you want to
          choose the best destination for your next trip?
        </p>
        <p>
          With this app you can build your own worldwide custom weather
          dashboard, check and compare 5 days of forecast and sort your places
          by temperature, precipitation & wind
        </p>
        <p>
          The tabs here are just a starting point: close them, search new
          places, drag them around and build your custom dashboard. You can make
          it even more yours by adding personalised backgrounds.
        </p>
        <button onClick={props.closeIntro}>ALL CLEAR, CLOSE THIS INTRO</button>
      </div>
      <FontAwesomeIcon
        icon="times-circle"
        size="lg"
        className="close-intro"
        onClick={props.closeIntro}
      />
    </div>
  );
};

export default Introduction;
