import React, { useState, useEffect } from 'react';
import './App.css'; 

const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Country Flags</h1>
      {error && <p>Error: {error}</p>}
      <div className="country-list">
        {countries.map((country) => (
          <div key={country.name.common} className="country-card">
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;