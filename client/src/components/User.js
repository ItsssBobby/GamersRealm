import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

const User = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>{data.user.username}</h2>
      <p>Name: {data.user.name}</p>
      <p>Email: {data.user.email}</p>
    </div>
  );
};

export default User;