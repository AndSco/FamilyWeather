import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Autocompletion = props => {
  const list = props.matches.map((match, index) => {
    const countryCode = match.country ? match.country : "null";
    return (
      <li
        key={index}
        onClick={e => {
          props.addNewCity(e, { name: match.name.toLowerCase(), countryCode });
          props.closeSearchBar();
          props.handleSearching();
        }}
      >
        {match.name} - {match.country} <FontAwesomeIcon icon="search" />
      </li>
    );
  });

  return (
    <div className="auto-completion">
      <ul>{list}</ul>
    </div>
  );
};

export default Autocompletion;
