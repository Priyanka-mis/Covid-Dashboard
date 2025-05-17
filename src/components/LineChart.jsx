// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./LineChart.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const LineChart = ({ data }) => {
//   if (!data || !data.cases || !data.recovered || !data.deaths) return null;

//   const processYearlyData = (dataset) => {
//     const yearly = {};
//     Object.entries(dataset).forEach(([dateStr, value]) => {
//       const year = new Date(dateStr).getFullYear();
//       yearly[year] = value;
//     });
//     return yearly;
//   };

//   const cases = processYearlyData(data.cases);
//   const recovered = processYearlyData(data.recovered);
//   const deaths = processYearlyData(data.deaths);

//   const years = Array.from(
//     new Set([
//       ...Object.keys(cases),
//       ...Object.keys(recovered),
//       ...Object.keys(deaths),
//     ])
//   ).sort();

//   const toMillions = (num) => +(num / 1_000_000).toFixed(2);

//   const chartData = {
//     labels: years,
//     datasets: [
//       {
//         label: "Cases",
//         data: years.map((y) => toMillions(cases[y] || 0)),
//         borderColor: "blue",
//         backgroundColor: "rgba(0,0,255,0.1)",
//         fill: false,
//       },
//       {
//         label: "Recovered",
//         data: years.map((y) => toMillions(recovered[y] || 0)),
//         borderColor: "green",
//         backgroundColor: "rgba(0,255,0,0.1)",
//         fill: false,
//       },
//       {
//         label: "Deaths",
//         data: years.map((y) => toMillions(deaths[y] || 0)),
//         borderColor: "red",
//         backgroundColor: "rgba(255,0,0,0.1)",
//         fill: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
    
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             return `${context.dataset.label}: ${context.parsed.y} M`;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: function (value) {
//             return `${value} M`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="line-chart-container">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// export default LineChart;




import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./LineChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  if (!data || !data.cases || !data.recovered || !data.deaths) {
    return <p>Loading or no data available</p>;
  }

  const processYearlyData = (dataset) => {
    const yearlyTotals = {};
    Object.entries(dataset).forEach(([dateStr, value]) => {
      const year = new Date(dateStr).getFullYear();
      yearlyTotals[year] = (yearlyTotals[year] || 0) + value;
    });
    return yearlyTotals;
  };

  const cases = processYearlyData(data.cases);
  const recovered = processYearlyData(data.recovered);
  const deaths = processYearlyData(data.deaths);

  const allYears = Array.from(
    new Set([...Object.keys(cases), ...Object.keys(recovered), ...Object.keys(deaths)])
  ).sort();

  const toMillions = (num) => +(num / 1_000_000).toFixed(2);

  const chartData = {
    labels: allYears,
    datasets: [
      {
        label: "Cases",
        data: allYears.map((y) => toMillions(cases[y] || 0)),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.1)",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Recovered",
        data: allYears.map((y) => toMillions(recovered[y] || 0)),
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.1)",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Deaths",
        data: allYears.map((y) => toMillions(deaths[y] || 0)),
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.1)",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y} M`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value} M`;
          },
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
