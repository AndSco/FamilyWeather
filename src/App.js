import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMinusCircle,
  faPlusCircle,
  faSearch,
  faClock,
  faSun,
  faCloudRain,
  faSnowflake,
  faTimesCircle,
  faSpinner,
  faArrowDown,
  faThermometerFull,
  faWind,
  faCalendarWeek,
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faMinusCircle,
  faPlusCircle,
  faSearch,
  faClock,
  faSun,
  faCloudRain,
  faSnowflake,
  faTimesCircle,
  faSpinner,
  faArrowDown,
  faThermometerFull,
  faWind,
  faCalendarWeek,
  faChevronCircleLeft,
  faChevronCircleRight
);

function App() {
  return (
    <div className="App">
      <Grid />
    </div>
  );
}

export default App;
