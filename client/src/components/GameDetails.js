import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_GAME_DETAILS, GET_GAME_SCREENSHOT, GET_USER_REVIEWS } from '../graphql/queries';

function GameDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_GAME_DETAILS, {
    variables: { id },
  });

  const { loading: screenshotLoading, error: screenshotError, data: screenshotData } = useQuery(GET_GAME_SCREENSHOT, {
    variables: { id },
  });

  const { loading: reviewLoading, error: reviewError, data: reviewData } = useQuery(GET_USER_REVIEWS, {
    variables: { userId: data?.game?.user_reviews_info[0]?.user?.id },
  });

  if (loading || screenshotLoading || reviewLoading) {
    return <div>Loading...</div>;
  }

  if (error || screenshotError || reviewError) {
    return <div>Error occurred: {error?.message || screenshotError?.message || reviewError?.message}</div>;
  }

  const gameDetails = data.game;
  const screenshots = screenshotData.gameScreenshots.results;
  const reviews = reviewData.userReviews;

  const platforms = gameDetails.platforms.map((platform) => platform.platform);
  const developers = gameDetails.developers;
  const publishers = gameDetails.publishers;

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