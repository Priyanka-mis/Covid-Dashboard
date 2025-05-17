export const processHistoricalData = (data, dateRange) => {
    if (!data || !data.timeline) {
      return {
        dates: [],
        cases: [],
        deaths: [],
        recovered: []
      };
    }
  
    const { cases, deaths, recovered } = data.timeline;
    
   
    const dates = Object.keys(cases);
    const casesArray = Object.values(cases);
    const deathsArray = Object.values(deaths);
    const recoveredArray = Object.values(recovered);
  
  
    if (dateRange && dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      
      const filteredData = dates.reduce((acc, date, index) => {
        const currentDate = new Date(date);
        if (currentDate >= startDate && currentDate <= endDate) {
          acc.dates.push(date);
          acc.cases.push(casesArray[index]);
          acc.deaths.push(deathsArray[index]);
          acc.recovered.push(recoveredArray[index]);
        }
        return acc;
      }, { dates: [], cases: [], deaths: [], recovered: [] });
      
      return filteredData;
    }
  
    return {
      dates,
      cases: casesArray,
      deaths: deathsArray,
      recovered: recoveredArray
    };
  };
  
 
  export const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };
  
 
  export const formatDate = (dateString) => {
    const [month, day, yearShort] = dateString.split('/');
    const year = `20${yearShort}`;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };
 
  export const processPieChartData = (countryData, populationMultiplier = 1) => {
    if (!countryData) {
      return {
        cases: 0,
        deaths: 0,
        recovered: 0,
        active: 0,
        population: 0
      };
    }
  
    const { cases, deaths, recovered, active, population } = countryData;
    
    return {
      cases,
      deaths,
      recovered,
      active,
      population: population * populationMultiplier 
    };
  };