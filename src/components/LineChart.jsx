import React from 'react';
import { LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import './LineChart.css';

const LineChart = ({ data }) => {
  if (!data || !data.dates || data.dates.length === 0) {
    return <div className="no-data">No data available</div>;
  }


  const chartData = data.dates.map((date, index) => {
   
    const formattedDate = new Date(date).getFullYear();
    
    return {
      date: formattedDate,
      cases: data.cases[index] / 1000000, 
      deaths: data.deaths[index] / 1000000,
      recovered: data.recovered[index] / 1000000
    };
  });
  
  const sampledData = sampleData(chartData, 15);

  
  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-year">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p 
              key={index} 
              style={{ color: entry.color }}
            >
              {`${entry.name}: ${entry.value.toFixed(1)}M`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="line-chart">
      <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart
  data={sampledData}
  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
>
 
  <XAxis 
    dataKey="date"
    tick={{ fontSize: 12 }}
    tickLine={false}
    axisLine={{ stroke: 'black' }}
  />
  <YAxis 
    tick={{ fontSize: 12 }}
    tickLine={false}
    axisLine={{ stroke: 'black' }} 
    tickFormatter={(value) => `${value.toFixed(1)}`}
    domain={[0, 'auto']}
  />
  <Tooltip content={customTooltip} />
  <Line 
    type="monotone" 
    dataKey="cases" 
    stroke="#8884d8" 
    activeDot={{ r: 8 }} 
    strokeWidth={2}
    dot={{ r: 3 }}
    name="Cases"
  />
  <Line 
    type="monotone" 
    dataKey="recovered" 
    stroke="#82ca9d" 
    strokeWidth={2}
    dot={{ r: 3 }}
    name="Recovered"
  />
  <Line 
    type="monotone" 
    dataKey="deaths" 
    stroke="#ff8042" 
    strokeWidth={2}
    dot={{ r: 3 }}
    name="Deaths"
  />
</RechartsLineChart>

      </ResponsiveContainer>
    </div>
  );
};


const sampleData = (data, numSamples) => {
  if (data.length <= numSamples) return data;
  
  const result = [];
  const step = Math.floor(data.length / numSamples);
  
  for (let i = 0; i < data.length; i += step) {
    result.push(data[i]);
  }
  

  if (result[result.length - 1] !== data[data.length - 1]) {
    result.push(data[data.length - 1]);
  }
  
  return result;
};

export default LineChart;