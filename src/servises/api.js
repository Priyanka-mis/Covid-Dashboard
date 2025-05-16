// api/api.js
export const fetchHistoricalData = async (countryCode) => {
  try {
    const response = await fetch(
      `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=1500`
    );
    if (!response.ok) throw new Error("Failed to fetch COVID data");
    const json = await response.json();
    return json.timeline; 
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Failed to fetch countries");
    const json = await response.json();
    json.sort((a, b) => a.name.common.localeCompare(b.name.common));
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};
