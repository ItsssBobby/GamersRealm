import React, { useState } from "react";
import "../Styles/main.css";
import AuthService from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPass(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { token } = await AuthService.login(email, pass);
      localStorage.setItem("token", token);
      window.location.replace("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form className="SearchBar login-form" onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              className="form-control-plaintext"
              value={email}
              type="email"
              placeholder="you@example.com"
              id="email"
              name="email"
              onChange={handleEmailChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="mb-3 row">
            <input
              className=""
              value={pass}
              type="password"
              placeholder="*******"
              id="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary" id="loginBtn">
              Log In
            </button>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-secondary"
              id="registerHerebtn"
              onClick={() => props.onFormSwitch("login")}
            >
              Register Here
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default <Login />;
