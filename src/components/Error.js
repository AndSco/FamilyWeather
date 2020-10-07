import React, { useState, useEffect } from "react";

const ErrorBox = props => {
  console.log("ERROR MOUNTED");

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  }, []);

  return isVisible ? (
    <div className="forecast">
      <div className="actualForecast">
        <div className="details">
          <p className="error-message">{props.error}</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default ErrorBox;
