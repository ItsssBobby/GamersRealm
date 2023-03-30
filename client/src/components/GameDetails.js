import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getGameScreenshot, getUserReviews } from '../rawgApi';

function GameDetails() {
  const location = useLocation();
  const gameDetails = location.state.gameDetails;
  const [screenshots, setScreenshots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const screenshotsData = await getGameScreenshot(gameDetails.id);
      setScreenshots(screenshotsData.results);

      const reviewsData = await getUserReviews(gameDetails.user_reviews_info[0].user.id);
      setReviews(reviewsData);

      const platformsData = gameDetails.platforms.map((platform) => platform.platform);
      setPlatforms(platformsData);

      const developersData = gameDetails.developers;
      setDevelopers(developersData);

      const publishersData = gameDetails.publishers;
      setPublishers(publishersData);
    };

    if (gameDetails) {
      fetchData();
    }
  }, [gameDetails]);

  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{gameDetails.name}</h1>
      <img src={gameDetails.background_image} alt={gameDetails.name} />
      <h2>Screenshots</h2>
      <div className="screenshots">
        {screenshots.map((screenshot) => (
          <img key={screenshot.id} src={screenshot.image} alt={gameDetails.name} />
        ))}
      </div>
      <h2>Details</h2>
      <p>Released: {gameDetails.released}</p>
      <p>Metacritic Score: {gameDetails.metacritic}</p>
      <p>Genres: {gameDetails.genres.map((genre) => genre.name).join(", ")}</p>
      <p>Platforms: {platforms.map((platform) => platform.name).join(", ")}</p>
      <p>Developers: {developers.map((developer) => developer.name).join(", ")}</p>
      <p>Publishers: {publishers.map((publisher) => publisher.name).join(", ")}</p>
      <h2>User Reviews</h2>
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.id}>
            <p>{review.user.username} says:</p>
            <p>{review.text}</p>
            <p>Rating: {review.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameDetails;