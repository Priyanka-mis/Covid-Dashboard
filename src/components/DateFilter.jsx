import React from "react";
import './DateFilter.css'

const DateFilter = ({ range, onChange }) => {
  const handleStartDateChange = (e) => {
    onChange([e.target.value, range[1]]);
  };

  const handleEndDateChange = (e) => {
    onChange([range[0], e.target.value]);
  };

  return (
    <div className="date-filter">
      <input
        type="date"
        value={range[0]}
        onChange={handleStartDateChange}
        className="input-date-filter"
      />
      <span>to</span>
      <input
        type="date"
        value={range[1]}
        onChange={handleEndDateChange}
        className="input-date-filter2"
      />
    </div>
  );
};

export default DateFilter;


