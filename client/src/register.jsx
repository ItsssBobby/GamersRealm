import React, { useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input value={name} name="name" placeholder="full name" />
        <label htmlFor="email">email</label>
        <input
          value={email}
          type="email"
          placeholder="youremail@email.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">password</label>
        <input
          value={pass}
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        />
        <button>Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch("login")}>
        Already Have An Account Log In Here
      </button>
    </>
  );
};