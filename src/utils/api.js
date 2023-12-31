import axios from 'axios';

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  params: {
    hl: 'en',
    gl: 'US'
    },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com',
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    console.error('Error while fetching data:', error);
    throw error; 
  }
};
