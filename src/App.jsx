import React, { useEffect, useState } from "react";
import { getAllemloyees } from "./api";

const App = () => {
  const [movies, setMovies] = useState([]);

  const Fetching = async () => {
    try {
      const response = await getAllemloyees();
      console.log("API Response:", response.data); 
      setMovies(response.data.data); 
    } catch (error) {
      console.error("API Fetch Error:", error);
    }
  };

  useEffect(() => {
    Fetching();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
        Top best 10 films
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
        }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              border: "1px solid black",
              padding: "10px",
              alignItems: "center",
              width: "100%",
            }}
          >
            
            <img
              src={movie.images && movie.images.length > 0 ? movie.images[0] : "https://via.placeholder.com/50x70"}
              alt={movie.name}
              style={{ width: "50px", height: "70px", objectFit: "cover", marginRight: "10px" }}
            />
            <div>
              <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>{movie.name}</h3>
              <p><strong>Country:</strong> {movie.country}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Rating:</strong> {movie.avgRate}</p>
              <p><strong>Episodes:</strong> {movie.episodes ? movie.episodes.length : "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
