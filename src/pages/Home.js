import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';
import Weather from '../components/Weather'; 
import '../App.css'; 

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [location, setLocation] = useState('Varna'); 

  
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <Box>
      <HeroBanner />

      {/* Floating Quote Section */}
      <Box className="floating-quote">
        <Typography variant="h3" className="quote-text">
          "You just can’t beat the person who never gives up."
        </Typography>
      </Box>

      {/* Weather Section */}
      <Box className="weather-section">
        <Typography variant="h5" gutterBottom>
          Check the weather for outdoor training
        </Typography>
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={handleLocationChange}
          className="location-input"
        />
        <Weather location={location} />
      </Box>

      {/* Search and Exercise Components */}
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </Box>
  );
};

export default Home;
