import React from "react";
import './CountrySelector.css'

const CountrySelector = ({ countries, onSelect }) => {
  return (
    <select className="coutry-selector" onChange={(e) => onSelect(e.target.value)}>
      {countries.map((country) => (
        <option key={country.cca2} value={country.cca2.toLowerCase()}>
          {country.name.common}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
