import React, { useEffect, useState } from "react";
import './App.css'
import Jobs from "./Jobs";
import Teachers from "./Teachers";

const App = () => {
  const [movies, setMovies] = useState([]);
 /*
  const Fetching = async () => {
    try {
      const response = await getAllemloyees();
      console.log("API Response:", response.data); 
      setMovies(response.data.data); 
    } catch (error) {
      console.error("API Fetch Error:", error);
    }
  };
  */

  
  return (

    <Teachers />
  );
};

export default App;
