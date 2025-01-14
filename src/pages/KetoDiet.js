import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KetoDiet = () => {
  const [ketoData, setKetoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);  

  useEffect(() => {
    const fetchKetoData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://keto-diet.p.rapidapi.com/',
          params: {
            protein_in_grams__lt: '15',
            protein_in_grams__gt: '5'
          },
          headers: {
            'x-rapidapi-key': '56511d10aamsh4cb0e2a476b8231p18daadjsnf4d127597367',
            'x-rapidapi-host': 'keto-diet.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        setKetoData(response.data);
      } catch (err) {
        if (err.response && err.response.status === 429) {
          setRateLimited(true);  
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchKetoData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (rateLimited) return <div>Rate limit exceeded. Please try again later.</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Keto Diet Information</h1>
      <pre>{JSON.stringify(ketoData, null, 2)}</pre>
    </div>
  );
};

export default KetoDiet;
