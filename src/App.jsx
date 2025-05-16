import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";  // yahan "StatCard" nahi, "StatsCard" hona chahiye
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import CountrySelector from "./components/CountrySelector";
import DateFilter from "./components/DateFilter";  // typo fix kiya
import { fetchHistoricalData, fetchCountries } from "./services/api";
import "./App.css"; // Importing CSS for styling

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("usa");
  const [countries, setCountries] = useState([]);
  const [covidData, setCovidData] = useState(null);
  const [dateRange, setDateRange] = useState(["2022-10-24", "2023-12-08"]);

  useEffect(() => {
    const getCountries = async () => {
      const countryList = await fetchCountries();
      setCountries(countryList);

      console.log(countryList), "countries";
      
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getCovidData = async () => {
      const data = await fetchHistoricalData(selectedCountry);
      setCovidData(data);
      console.log(data,"DATA IS HERE");
    };
    getCovidData();
  }, [selectedCountry]);

  return (
    <div className="app-container">
      <Header />

      <div className="filters-container">
        <CountrySelector countries={countries} onSelect={setSelectedCountry} />
        <DateFilter range={dateRange} onChange={setDateRange} />
      </div>

      {covidData && (
        <>
          <div className="stats-cards">
            <StatsCard className="total"
              label="Total Cases"
              value={Object.values(covidData.cases).pop().toLocaleString()}
            />
            <StatsCard className="recovered"
              label="Recoveries"
              value={Object.values(covidData.recovered).pop().toLocaleString()}
            />
            <StatsCard className="death"
              label="Deaths"
              value={Object.values(covidData.deaths).pop().toLocaleString()}
            />
          </div>

          <div className="charts-container">
            <LineChart data={covidData} />
            <PieChart data={covidData} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
