import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import "../Styles/main.css";

function Register(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    onCompleted: () => {
      navigate("/");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    addUser({ variables: { name: name, email: email, password: password } });
  };

  return (
    <>
      <form className="SearchBar register-form" onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Full Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="name"
              className="form-control-plaintext"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control-plaintext"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="*******"
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary" id="registerBtn">
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
        {error && <p>Error: {error.message}</p>}
      </form>
    </>
  );
};

export default <Register />;