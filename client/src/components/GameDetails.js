import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { GET_GAME_DETAILS, GET_USER_REVIEWS } from "../utils/queries";
import { ADD_REVIEW, ADD_COMMENT } from "../utils/mutations";
import AuthService from "../utils/auth";

function GameDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_GAME_DETAILS, {
    variables: { gameId: id },
  });

  const [addReview, { loading: addReviewLoading, error: addReviewError }] =
    useMutation(ADD_REVIEW);
  const [addComment, { loading: addCommentLoading, error: addCommentError }] =
    useMutation(ADD_COMMENT);

  const userId = data?.game?.userReviews[0]?.userId;

  const {
    loading: reviewLoading,
    error: reviewError,
    data: reviewData,
  } = useQuery(GET_USER_REVIEWS, {
    variables: { userId },
    skip: !userId,
  });

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewRating, setReviewRating] = useState(1);

  const [commentBody, setCommentBody] = useState("");

  const handleSubmitReview = (event) => {
    event.preventDefault();
    addReview({
      variables: {
        title: reviewTitle,
        body: reviewBody,
        rating: reviewRating,
        gameId: id,
      },
      refetchQueries: [
        {
          query: GET_USER_REVIEWS,
          variables: { userId },
        },
      ],
    });
    setReviewTitle("");
    setReviewBody("");
    setReviewRating(1);
  };

  const handleSubmitComment = (event, reviewId) => {
    event.preventDefault();
    addComment({
      variables: {
        body: commentBody,
        reviewId: reviewId,
      },
      refetchQueries: [
        {
          query: GET_USER_REVIEWS,
          variables: { userId },
        },
      ],
    });
    setCommentBody("");
  };

  if (
    loading ||
    (reviewLoading && userId) ||
    addReviewLoading ||
    addCommentLoading
  ) {
    return <div>Loading...</div>;
  }

  if (error || reviewError || addReviewError || addCommentError) {
    return (
      <div>
        Error occurred:{" "}
        {error?.message ||
          reviewError?.message ||
          addReviewError?.message ||
          addCommentError?.message}
      </div>
    );
  }

  const gameDetails = data.game;
  const reviews = reviewData?.userReviews;

  const platforms = gameDetails.platforms.map((platform) => platform.platform);
  const publishers = gameDetails.publishers;

  const isLoggedIn = AuthService.loggedIn();

  return (
    <div>
      <h1>{gameDetails.name}</h1>
      <img src={gameDetails.background_image} alt={gameDetails.name} />
      <h2>Details</h2>
      <p>Released: {gameDetails.released}</p>
      <p>Rating: {gameDetails.rating}</p>
      <p>
        Website: <a href={gameDetails.website}>{gameDetails.website}</a>
      </p>
      <p>Description:</p>
      <div dangerouslySetInnerHTML={{ __html: gameDetails.description }} />
      <p>Platforms: {platforms.map((platform) => platform.name).join(", ")}</p>
      {isLoggedIn && (
    <div>
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmitReview}>
        <label>
          Title:
          <input
            type="text"
            value={reviewTitle}
            onChange={(event) => setReviewTitle(event.target.value)}
          />
        </label>
        <label>
          Body:
          <textarea
            value={reviewBody}
            onChange={(event) => setReviewBody(event.target.value)}
          />
        </label>
        <label>
          Rating:
          <select
            value={reviewRating}
            onChange={(event) =>
              setReviewRating(parseInt(event.target.value))
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )}
  {!isLoggedIn && (
    <div>
      <p>
        To leave a review, please <Link to='/login'>log in</Link>.
      </p>
    </div>
  )}
</div>
);
}

export default <GameDetails />;