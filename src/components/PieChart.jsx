// // import React from "react";
// // import { Pie } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   Title,
// // } from "chart.js";

// // ChartJS.register(ArcElement, Tooltip, Legend, Title);

// // const PieChart = ({ data }) => {
// //   if (!data) return null;

// //   const cases = Object.values(data.cases).pop();
// //   const recovered = Object.values(data.recovered).pop();
// //   const deaths = Object.values(data.deaths).pop();

// //   const chartData = {
// //     labels: ["Cases", "Recovered", "Deaths"],
// //     datasets: [
// //       {
// //         label: "Distribution",
// //         data: [cases, recovered, deaths],
// //         backgroundColor: [
// //           "rgba(54, 162, 235, 0.6)",
// //           "rgba(75, 192, 192, 0.6)",
// //           "rgba(255, 99, 132, 0.6)",
// //         ],
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const options = {
// //     responsive: true,
// //     plugins: {
// //       legend: { position: "bottom" },
// //       title: { display: true, text: "COVID-19 Distribution" },
// //     },
// //   };

// //   return (
// //     <Pie
// //       key={`${cases}-${recovered}-${deaths}`} // 🛠️ Important to avoid canvas reuse error
// //       data={chartData}
// //       options={options}
// //     />
// //   );
// // };

// // export default PieChart;



// import React from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";
// import "./PieChart.css";

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// const PieChart = ({ data }) => {
//   if (!data || !data.cases || !data.recovered || !data.deaths) return null;

//   // Get the latest values
//   const latestCases = Object.values(data.cases).pop();
//   const latestRecovered = Object.values(data.recovered).pop();
//   const latestDeaths = Object.values(data.deaths).pop();

//   // Convert to millions
//   const toMillions = (num) => +(num / 1_000_000).toFixed(2);

//   const chartData = {
//     labels: ["Total Cases", "Recovered", "Deaths"],
//     datasets: [
//       {
//         label: "COVID-19 Summary (in Millions)",
//         data: [
//           toMillions(latestCases),
//           toMillions(latestRecovered),
//           toMillions(latestDeaths),
//         ],
//         backgroundColor: [
//           "rgba(54, 162, 235, 0.6)", // blue for cases
//           "rgba(75, 192, 192, 0.6)", // green for recovered
//           "rgba(255, 99, 132, 0.6)", // red for deaths
//         ],
//         borderColor: "#fff",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "bottom" },
//       title: {
//         display: true,
//         text: "COVID-19 Distribution (in Millions)",
//         font: { size: 16 },
//       },
//       tooltip: {
//         callbacks: {
//           label: (ctx) => `${ctx.label}: ${ctx.raw} M`,
//         },
//       },
//     },
//   };

//   return (
//     <div className="pie-chart-container">
//       <Pie
//         key={`${latestCases}-${latestRecovered}-${latestDeaths}`}
//         data={chartData}
//         options={options}
//       />
//     </div>
//   );
// };

// export default PieChart;


import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import "./PieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ data }) => {
  if (!data || !data.cases || !data.recovered || !data.deaths) return null;

  const latestCases = Object.values(data.cases).pop();
  const latestRecovered = Object.values(data.recovered).pop();
  const latestDeaths = Object.values(data.deaths).pop();

  const totalPopulation = 140_000_000;

  const chartData = {
    labels: [ "total population"],
    datasets: [
      {
        data: [
          latestRecovered,
          latestDeaths,
          latestCases,
          totalPopulation - (latestCases + latestRecovered + latestDeaths),
        ],
        backgroundColor: [
          "#2ecc71",  // ✅ Green for recovered
          "#e74c3c",  // ✅ Red for deaths
          "#f4e2b0",  // ✅ Grey for cases (instead of blue)
          
        ],
        borderWidth: 1,
        cutout: "60%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "COVID-19 and Population Overview",
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.label || "";
            const value = ctx.raw;
            return `${label}: ${(value / 1_000_000).toFixed(1)} M`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-wrapper">
      <div className="pie-chart-container">
        <Pie data={chartData} options={options} />
      </div>
      <div className="total-label">140 M Total Population</div>
    </div>
  );
};

export default PieChart;
