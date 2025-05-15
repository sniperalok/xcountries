import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://xcountries-backend.azurewebsites.net/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched countries:", data); // You can remove this after testing
        setCountries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Something went wrong");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // matches test case
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {countries.map((country, index) => (
        <div
          key={index}
          style={{
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            margin: "10px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {country.flags?.png ? (
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name?.common || "Unknown"}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No Flag
            </div>
          )}
          <h2 style={{ textAlign: "center", fontSize: "16px" }}>
            {country.name?.common || "Unknown Country"}
          </h2>
        </div>
      ))}
    </div>
  );
}
