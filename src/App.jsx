import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import CountrySelector from "./components/CountrySelector";
import DateFilter from "./components/DateFilter";
import { fetchHistoricalData, fetchCountries } from "./services/api";
import "./App.css";


const formatNumber = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  // if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
};

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("usa");
  const [countries, setCountries] = useState([]);
  const [covidData, setCovidData] = useState(null);
  const [dateRange, setDateRange] = useState(["2022-10-24", "2023-12-08"]);

  useEffect(() => {
    const getCountries = async () => {
      const countryList = await fetchCountries();
      setCountries(countryList);
      console.log(countryList, "countries");
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getCovidData = async () => {
      const data = await fetchHistoricalData(selectedCountry);
      setCovidData(data);
      console.log(data, "covid DATA IS HERE");
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
            <StatsCard
              className="total"
              label="Total Cases"
              value={formatNumber(Object.values(covidData.cases).pop())}
            />
            <StatsCard
              className="recovered"
              label="Recoveries"
              value={formatNumber(Object.values(covidData.recovered).pop())}
            />
            <StatsCard
              className="death"
              label="Deaths"
              value={formatNumber(Object.values(covidData.deaths).pop())}
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
