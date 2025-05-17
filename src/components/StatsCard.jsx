import React from "react";
import './StatsCard.css'

const StatsCard = ({ label, value, className }) => {
  return (
    <>
 
    <div className={`stats-card ${className}`}>
      <h2 >{label}</h2>
      <p >{value}</p>
    </div>
  
    </>
    
  );
};

export default StatsCard;

