import React, { useState } from 'react';
import './DateRangePicker.css';

const DateRangePicker = ({ dateRange, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...dateRange,
      [name]: value
    });
  };

  
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const displayText = `${formatDisplayDate(dateRange.start)} - ${formatDisplayDate(dateRange.end)}`;

  return (
    <div className="date-range-picker">
        <span className='range' style={{color:"black"}}>Filter by Date-Range</span>
      <div className="date-display" onClick={handleToggleCalendar}>
        <span>{displayText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className={`calendar-icon ${isOpen ? 'open' : ''}`}
        >
          <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg>
      </div>
      
      {isOpen && (
        <div className="date-picker-dropdown">
          <div className="date-input-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="start"
              value={dateRange.start}
              onChange={handleDateChange}
              max={dateRange.end}
            />
          </div>
          <div className="date-input-group">
            <label>End Date:</label>
            <input
              type="date"
              name="end"
              value={dateRange.end}
              onChange={handleDateChange}
              min={dateRange.start}
            />
          </div>
          <button 
            className="apply-btn" 
            onClick={handleToggleCalendar}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;