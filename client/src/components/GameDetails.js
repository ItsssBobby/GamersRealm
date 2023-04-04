import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_GAME_DETAILS, GET_USER_REVIEWS } from '../graphql/queries';

function GameDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_GAME_DETAILS, {
    variables: { gameId: id },
  });

  const userId = data?.game?.userReviews[0]?.userId;
  const { loading: reviewLoading, error: reviewError, data: reviewData } = useQuery(GET_USER_REVIEWS, {
    variables: { userId },
    skip: !userId,
  });

  if (loading || (reviewLoading && userId)) {
    return <div>Loading...</div>;
  }

  if (error || reviewError) {
    return <div>Error occurred: {error?.message || reviewError?.message}</div>;
  }

  const gameDetails = data.game;
  const reviews = reviewData?.userReviews;

  const platforms = gameDetails.platforms.map((platform) => platform.platform);
  const publishers = gameDetails.publishers;

  return (
    <div>
      <h1>{gameDetails.name}</h1>
      <img src={gameDetails.background_image} alt={gameDetails.name} />
      <h2>Details</h2>
      <p>Released: {gameDetails.released}</p>
      <p>Rating: {gameDetails.rating}</p>
      <p>Website: <a href={gameDetails.website}>{gameDetails.website}</a></p>
      <p>Description:</p>
      <div dangerouslySetInnerHTML={{ __html: gameDetails.description }} />
      <p>Platforms: {platforms.map((platform) => platform.name).join(", ")}</p>
      <p>Publishers: {publishers.map((publisher) => publisher.name).join(", ")}</p>
      <h2>User Reviews</h2>
      <div className="reviews">
        {reviews && reviews.map((review) => (
          <div key={review.id}>
            <p>{review.title}</p>
            <p>{review.body}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameDetails;