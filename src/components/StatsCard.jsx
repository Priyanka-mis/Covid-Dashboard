import React from 'react';
import './StatsCard.css';

const formatNumber = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toString();
};

const StatCard = ({ title, value, color }) => {
  const formattedValue = formatNumber(value);

  const getPercentage = () => {
    if (title === "Deaths") {
      return "0.007";
    }
    return "0.002";
  };

  return (
    <div className="stat-card">
      <div className="stat-info" style={{ backgroundColor: color }}>
        <div className="stat-title">{title}</div>
        <div className="stat-percentage">{getPercentage()}%</div>
      </div>
      <div className="stat-value-container">
        <div className="stat-value">{formattedValue}</div>
      </div>
    </div>
  );
};

export default StatCard;
