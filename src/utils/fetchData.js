export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,  // Ensure this key is correctly set in .env
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY, // Add this key to .env as well if required
  },
};

export const fetchData = async (url, options) => {
  try {
    const res = await fetch(url, options);
    
    // Check if the response is successful (status 200-299)
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}. Status: ${res.status}`);
    }

    const data = await res.json();
    
    // Check if the data is valid and contains the expected result
    if (!data || Object.keys(data).length === 0) {
      throw new Error(`Received empty data from ${url}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;  // Return null or handle the error as needed
  }
};
