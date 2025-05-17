import React from 'react';
import Select from 'react-select';
import './CountryDropdown.css';

const CountryDropdown = ({ countries, selectedCountry, onChange }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: 250,
      borderRadius: '50px',
      border: '1px solid #ddd',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #aaa',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f0f6ff' : 'white',
      color: '#333',
      '&:hover': {
        backgroundColor: '#f0f6ff',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
    }),
  };

  
  const formatOptionLabel = ({ label }) => (
    <div className="country-option">
      <span className='search-con'>{label}</span>
    </div>
  );

  return (
    <div className="country-dropdown">
      <div className="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </div>
      <Select
        options={countries}
        value={selectedCountry}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        placeholder="Search Country"
        className="select-container"
      />
    </div>
  );
};

export default CountryDropdown;