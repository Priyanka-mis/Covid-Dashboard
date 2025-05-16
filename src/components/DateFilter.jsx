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

// import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./DateFilter.css";

// const DateFilter = ({ range, onChange }) => {
//   const [startDate, endDate] = range;

//   return (
//     <div className="date-filter-single">
//       <DatePicker
//         selected={startDate ? new Date(startDate) : null}
//         onChange={(dates) => {
//           const [start, end] = dates;
//           onChange([start, end]);
//         }}
//         startDate={startDate ? new Date(startDate) : null}
//         endDate={endDate ? new Date(endDate) : null}
//         selectsRange
//         placeholderText="Select date range"
//         className="date-range-input"
//         dateFormat="yyyy-MM-dd"
//         showMonthDropdown
//         showYearDropdown
//         dropdownMode="select"
//       />
//     </div>
//   );
// };

// export default DateFilter;
