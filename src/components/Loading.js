import React from "react";

const Loading = () => {
  return (
    <div className={`forecast`}>
      <div className="actualForecast">
        <div className="details spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
