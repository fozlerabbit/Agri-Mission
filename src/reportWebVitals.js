import React, { useState, useEffect } from 'react';

const NASAFarmNavigators = () => {
  const [gameState, setGameState] = useState('loading');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [irrigation, setIrrigation] = useState(false);
  const [fertilizer, setFertilizer] = useState(false);
  const [season, setSeason] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [lastResults, setLastResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [alerts, setAlerts] = useState([]);

  const worldCountries = [
    { name: 'Afghanistan', lat: 33.9391, lon: 67.7100, code: 'AF' },
    { name: 'Albania', lat: 41.1533, lon: 20.1683, code: 'AL' },
    { name: 'Algeria', lat: 28.0339, lon: 1.6596, code: 'DZ' },
    { name: 'Argentina', lat: -38.4161, lon: -63.6167, code: 'AR' },
    { name: 'Armenia', lat: 40.0691, lon: 45.0382, code: 'AM' },
    { name: 'Australia', lat: -25.2744, lon: 133.7751, code: 'AU' },
    { name: 'Austria', lat: 47.5162, lon: 14.5501, code: 'AT' },
    { name: 'Azerbaijan', lat: 40.1431, lon: 47.5769, code: 'AZ' },
    { name: 'Bangladesh', lat: 23.6850, lon: 90.3563, code: 'BD' },
    { name: 'Belarus', lat: 53.7098, lon: 27.9534, code: 'BY' },
    { name: 'Belgium', lat: 50.5039, lon: 4.4699, code: 'BE' },
    { name: 'Bolivia', lat: -16.2902, lon: -63.5887, code: 'BO' },
    { name: 'Brazil', lat: -14.2350, lon: -51.9253, code: 'BR' },
    { name: 'Bulgaria', lat: 42.7339, lon: 25.4858, code: 'BG' },
    { name: 'Cambodia', lat: 12.5657, lon: 104.9910, code: 'KH' },
    { name: 'Cameroon', lat: 7.3697, lon: 12.3547, code: 'CM' },
    { name: 'Canada', lat: 56.1304, lon: -106.3468, code: 'CA' },
    { name: 'Chad', lat: 15.4542, lon: 18.7322, code: 'TD' },
    { name: 'Chile', lat: -35.6751, lon: -71.5430, code: 'CL' },
    { name: 'China', lat: 35.8617, lon: 104.1954, code: 'CN' },
    { name: 'Colombia', lat: 4.5709, lon: -74.2973, code: 'CO' },
    { name: 'Democratic Republic of Congo', lat: -4.0383, lon: 21.7587, code: 'CD' },
    { name: 'Czech Republic', lat: 49.8175, lon: 15.4730, code: 'CZ' },
    { name: 'Denmark', lat: 56.2639, lon: 9.5018, code: 'DK' },
    { name: 'Egypt', lat: 26.0975, lon: 31.2357, code: 'EG' },
    { name: 'Ethiopia', lat: 9.1450, lon: 40.4897, code: 'ET' },
    { name: 'Finland', lat: 61.9241, lon: 25.7482, code: 'FI' },
    { name: 'France', lat: 46.2276, lon: 2.2137, code: 'FR' },
    { name: 'Germany', lat: 51.1657, lon: 10.4515, code: 'DE' },
    { name: 'Ghana', lat: 7.9465, lon: -1.0232, code: 'GH' },
    { name: 'Greece', lat: 39.0742, lon: 21.8243, code: 'GR' },
    { name: 'Hungary', lat: 47.1625, lon: 19.5033, code: 'HU' },
    { name: 'India', lat: 20.5937, lon: 78.9629, code: 'IN' },
    { name: 'Indonesia', lat: -0.7893, lon: 113.9213, code: 'ID' },
    { name: 'Iran', lat: 32.4279, lon: 53.6880, code: 'IR' },
    { name: 'Iraq', lat: 33.2232, lon: 43.6793, code: 'IQ' },
    { name: 'Ireland', lat: 53.4129, lon: -8.2439, code: 'IE' },
    { name: 'Israel', lat: 31.0461, lon: 34.8516, code: 'IL' },
    { name: 'Italy', lat: 41.8719, lon: 12.5674, code: 'IT' },
    { name: 'Japan', lat: 36.2048, lon: 138.2529, code: 'JP' },
    { name: 'Kazakhstan', lat: 48.0196, lon: 66.9237, code: 'KZ' },
    { name: 'Kenya', lat: -0.0236, lon: 37.9062, code: 'KE' },
    { name: 'Libya', lat: 26.3351, lon: 17.2283, code: 'LY' },
    { name: 'Madagascar', lat: -18.7669, lon: 46.8691, code: 'MG' },
    { name: 'Mali', lat: 17.5707, lon: -3.9962, code: 'ML' },
    { name: 'Mexico', lat: 23.6345, lon: -102.5528, code: 'MX' },
    { name: 'Mongolia', lat: 46.8625, lon: 103.8467, code: 'MN' },
    { name: 'Morocco', lat: 31.7917, lon: -7.0926, code: 'MA' },
    { name: 'Myanmar', lat: 21.9162, lon: 95.9560, code: 'MM' },
    { name: 'Netherlands', lat: 52.1326, lon: 5.2913, code: 'NL' },
    { name: 'Niger', lat: 17.6078, lon: 8.0817, code: 'NE' },
    { name: 'Nigeria', lat: 9.0820, lon: 8.6753, code: 'NG' },
    { name: 'Norway', lat: 60.4720, lon: 8.4689, code: 'NO' },
    { name: 'Pakistan', lat: 30.3753, lon: 69.3451, code: 'PK' },
    { name: 'Peru', lat: -9.1900, lon: -75.0152, code: 'PE' },
    { name: 'Philippines', lat: 12.8797, lon: 121.7740, code: 'PH' },
    { name: 'Poland', lat: 51.9194, lon: 19.1451, code: 'PL' },
    { name: 'Romania', lat: 45.9432, lon: 24.9668, code: 'RO' },
    { name: 'Russia', lat: 61.5240, lon: 105.3188, code: 'RU' },
    { name: 'Saudi Arabia', lat: 23.8859, lon: 45.0792, code: 'SA' },
    { name: 'South Africa', lat: -30.5595, lon: 22.9375, code: 'ZA' },
    { name: 'South Korea', lat: 35.9078, lon: 127.7669, code: 'KR' },
    { name: 'Spain', lat: 40.4637, lon: -3.7492, code: 'ES' },
    { name: 'Sudan', lat: 12.8628, lon: 30.2176, code: 'SD' },
    { name: 'Sweden', lat: 60.1282, lon: 18.6435, code: 'SE' },
    { name: 'Thailand', lat: 15.8700, lon: 100.9925, code: 'TH' },
    { name: 'Turkey', lat: 38.9637, lon: 35.2433, code: 'TR' },
    { name: 'Ukraine', lat: 48.3794, lon: 31.1656, code: 'UA' },
    { name: 'United Kingdom', lat: 55.3781, lon: -3.4360, code: 'GB' },
    { name: 'United States', lat: 39.8283, lon: -98.5795, code: 'US' },
    { name: 'Uzbekistan', lat: 41.3775, lon: 64.5853, code: 'UZ' },
    { name: 'Venezuela', lat: 6.4238, lon: -66.5897, code: 'VE' },
    { name: 'Vietnam', lat: 14.0583, lon: 108.2772, code: 'VN' },
    { name: 'Yemen', lat: 15.5527, lon: 48.5164, code: 'YE' },
    { name: 'Zambia', lat: -13.1339, lon: 27.8493, code: 'ZM' }
  ];

  const crops = [
    {
      id: 'wheat',
      name: 'Wheat',
      icon: '🌾',
      optimalTemp: [15, 25],
      waterNeed: 500,
      description: 'Cool season grain crop - Great for temperate climates'
    },
    {
      id: 'rice',
      name: 'Rice',
      icon: '🍚',
      optimalTemp: [20, 35],
      waterNeed: 1200,
      description: 'Water-intensive staple grain - Needs lots of water'
    },
    {
      id: 'maize',
      name: 'Corn',
      icon: '🌽',
      optimalTemp: [18, 30],
      waterNeed: 600,
      description: 'Warm season cereal grain - Versatile crop'
    },
    {
      id: 'sorghum',
      name: 'Sorghum',
      icon: '🌾',
      optimalTemp: [25, 35],
      waterNeed: 400,
      description: 'Drought-tolerant grain - Perfect for dry areas'
    },
    {
      id: 'soybeans',
      name: 'Soybeans',
      icon: '🫛',
      optimalTemp: [20, 30],
      waterNeed: 500,
      description: 'Protein-rich legume - Improves soil naturally'
    }
  ];

  const fetchNASAData = async (lat, lon) => {
    try {
      const startDate = '20230101';
      const endDate = '20231231';
      
      const powerUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN&community=AG&longitude=${lon}&latitude=${lat}&start=${startDate}&end=${endDate}&format=JSON`;
      
      const response = await fetch(powerUrl);
      if (!response.ok) {
        throw new Error(`NASA POWER API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const tempData = Object.values(data.properties.parameter.T2M);
      const precipData = Object.values(data.properties.parameter.PRECTOTCORR);
      const solarData = Object.values(data.properties.parameter.ALLSKY_SFC_SW_DWN);
      
      const avgTemp = tempData.reduce((a, b) => a + b, 0) / tempData.length;
      const totalPrecip = precipData.reduce((a, b) => a + b, 0);
      const avgSolar = solarData.reduce((a, b) => a + b, 0) / solarData.length;
      
      const ndvi = Math.max(0.1, Math.min(0.9, (totalPrecip / 1000) * (1 - Math.abs(avgTemp - 25) / 25)));
      
      return {
        temperature: Math.round(avgTemp * 10) / 10,
        precipitation: Math.round(totalPrecip * 10) / 10,
        solar: Math.round(avgSolar * 10) / 10,
        ndvi: Math.round(ndvi * 100) / 100
      };
    } catch (error) {
      console.error('Error fetching NASA data:', error);
      return {
        temperature: 20 + Math.random() * 20,
        precipitation: 300 + Math.random() * 1000,
        solar: 150 + Math.random() * 100,
        ndvi: 0.3 + Math.random() * 0.5
      };
    }
  };

  const generateAlerts = (country) => {
    const alerts = [];
    
    // Heavy rain alert
    if (country.precipitation > 1200) {
      alerts.push({
        type: 'rain',
        icon: '🌧️',
        title: 'Heavy Rain Alert',
        message: `High rainfall expected (${country.precipitation}mm). Consider drainage and flood protection for crops.`,
        severity: 'warning'
      });
    }
    
    // Drought alert
    if (country.precipitation < 300) {
      alerts.push({
        type: 'drought',
        icon: '☀️',
        title: 'Drought Warning',
        message: `Low rainfall detected (${country.precipitation}mm). Irrigation systems recommended.`,
        severity: 'danger'
      });
    }
    
    // Earthquake risk (simulated based on certain regions)
    const earthquakeRiskCountries = ['JP', 'CL', 'TR', 'PH', 'ID', 'IT', 'GR'];
    if (earthquakeRiskCountries.includes(country.code)) {
      alerts.push({
        type: 'earthquake',
        icon: '⚠️',
        title: 'Earthquake Risk Zone',
        message: `This region has seismic activity. Consider earthquake-resistant farming structures.`,
        severity: 'info'
      });
    }
    
    // Temperature alerts
    if (country.temperature > 35) {
      alerts.push({
        type: 'heat',
        icon: '🔥',
        title: 'Extreme Heat Alert',
        message: `High temperatures (${country.temperature}°C). Crops may need shade protection.`,
        severity: 'danger'
      });
    }
    
    if (country.temperature < 5) {
      alerts.push({
        type: 'cold',
        icon: '❄️',
        title: 'Frost Warning',
        message: `Cold temperatures (${country.temperature}°C). Protect crops from frost damage.`,
        severity: 'warning'
      });
    }
    
    return alerts;
  };

  const loadCountryData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load data for all countries in batches to avoid overwhelming the API
      const batchSize = 10;
      const countriesWithData = [];
      
      for (let i = 0; i < worldCountries.length; i += batchSize) {
        const batch = worldCountries.slice(i, i + batchSize);
        const batchPromises = batch.map(async (country) => {
          const nasaData = await fetchNASAData(country.lat, country.lon);
          return {
            ...country,
            ...nasaData,
            climate: getClimateType(nasaData.temperature, nasaData.precipitation)
          };
        });
        
        const batchResults = await
