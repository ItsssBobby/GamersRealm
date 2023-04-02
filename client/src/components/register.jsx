import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(email, password, name);

    // Navigate to the home page after the form is submitted
    history.push("/");
  };

  return (
    <form className="SearchBar h-10 flex justify-center bg-[#a9afb2]" onSubmit={handleSubmit}>
      <label htmlFor="name">Full Name</label>
      <input className="bg-[#a9afb2] px-3 placeholder-black"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Full Name"
      />
      <label className="bg-[#a9afb2]" htmlFor="email">Email</label>
      <input className="bg-[#a9afb2] px-3 placeholder-black"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="you@example.com"
      />
      <label className="bg-[#a9afb2]" htmlFor="password">Password</label>
      <input className="bg-[#a9afb2]  px-3 placeholder-black"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="********"
      />
      <button className="bg-[#a9afb2]" type="submit">Register</button>
    </form>
  );
};