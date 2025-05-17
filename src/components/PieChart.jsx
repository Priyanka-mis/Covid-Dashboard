import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatNumber } from '../utils/helpers';
import './PieChart.css';

const PieChart = ({ data }) => {
  if (!data) {
    return <div className="no-data">No data available</div>;
  }

  const chartData = [
        { name: 'Total Population', value: data.population - data.active - data.recovered - data.deaths, color: '#F2C078' },
        { name: 'Recovered', value: data.recovered, color: 'rgb(10 212 79)' },
        { name: 'Deaths', value: data.deaths, color: 'rgb(255 67 67)' }
      ];
      

  const totalPopulation = formatNumber(data.population);

  
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-pie-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value">{formatNumber(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pie-chart">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}% `}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
        </RechartsPieChart>
      </ResponsiveContainer>
      <div className="population-indicator">
        <span className="population-label">Total Population</span>
        <span className="population-value">{totalPopulation}</span>
      </div>
    </div>
  );
};

export default PieChart;