require('dotenv').config(); // load environment variables from .env file

const RAWG_API_BASE_URL = 'https://api.rawg.io/api';

export const getGames = async (search, sort) => {
  const response = await fetch(
    `${RAWG_API_BASE_URL}/games?search=${search}&ordering=${sort}&key=${process.env.RAWG_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const getGameDetails = async (id) => {
  const response = await fetch(`${RAWG_API_BASE_URL}/games/${id}?key=${process.env.RAWG_API_KEY}`);
  const data = await response.json();
  return data;
};

export const getGameScreenshot = async (id) => {
  const response = await fetch(`${RAWG_API_BASE_URL}/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`);
  const data = await response.json();
  return data;
};

export const getUserReviews = async (userId) => {
  const response = await fetch(`${RAWG_API_BASE_URL}/users/${userId}/reviews?key=${process.env.RAWG_API_KEY}`);
  const data = await response.json();
  return data.results;
};