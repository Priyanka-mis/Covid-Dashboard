import axios from "axios";

export const fetchHistoricalData = async (country = 'usa', days = 1500) => {
  try {
    const response = await axios.get(
      `https://disease.sh/v3/covid-19/historical/${country}?lastdays=${days}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};


export const fetchCountryData = async (country = 'usa') => {
  try {
    const response = await axios.get(
      `https://disease.sh/v3/covid-19/countries/${country}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
};


export const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
   
    const formattedCountries = response.data.map(country => ({
      value: country.cca3.toLowerCase(),
      label: country.name.common,
      flag: country.flags.svg
    }));
    return formattedCountries.sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};


export const fetchGlobalData = async () => {
  try {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching global data:', error);
    throw error;
  }
};