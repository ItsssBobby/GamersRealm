// require('dotenv').config(); // load environment variables from .env file

const RAWG_API_BASE_URL = 'https://api.rawg.io/api';

export const getGames = async (search, sortBy) => {
  const response = await fetch(
    `${RAWG_API_BASE_URL}/games?search=${search}&ordering=${sortBy}&key=4b4018296fef49f796f340975980bc2c`,
  { mode: 'cors' }
  );
  const data = await response.json();
  console.log(data.results);
  return data.results;
};

export const getGameDetails = async (id) => {
  const response = await fetch(`${RAWG_API_BASE_URL}/games/${id}?key=4b4018296fef49f796f340975980bc2c`, { mode: 'cors' });
  const data = await response.json();
  return data;
};

export const getGameScreenshot = async (id) => {
  const response = await fetch(`${RAWG_API_BASE_URL}/games/${id}/screenshots?key=4b4018296fef49f796f340975980bc2c`, { mode: 'cors' });
  const data = await response.json();
  return data;
};

export const getUserReviews = async (userId) => {
  const response = await fetch(`${RAWG_API_BASE_URL}/users/${userId}/reviews?key=4b4018296fef49f796f340975980bc2c`, { mode: 'cors' });
  const data = await response.json();
  return data.results;
};