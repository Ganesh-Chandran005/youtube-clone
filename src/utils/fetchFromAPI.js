import axios from 'axios';

const BASE_URL = 'https://youtube-v311.p.rapidapi.com';

const options = {
  params: { maxResults: '50' },
  headers: {
    'X-RapidAPI-Key': 'e3e2a052f2mshb154c9f5db84248p1d88cbjsnfa951c052fab',
    'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
  }
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};