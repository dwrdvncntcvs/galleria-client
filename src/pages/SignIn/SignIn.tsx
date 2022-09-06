import React, { useState, ChangeEvent, FormEvent } from "react";
import { SignInForm } from "./components";
import "./signIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputFields = [
    {
      placeholder: "Email",
      type: "email",
      value: email,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    },
    {
      placeholder: "Password",
      type: "password",
      value: password,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
  ];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const data = { email, password };
    console.log(data);
  };

  return (
    <div className="si__main-container">
      <h1>Sign In</h1>
      <form onSubmit={submit}>
        {inputFields.map(({ placeholder, type, value, onChange }, i) => (
          <input
            key={i}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
          />
        ))}
        <button type="submit">Sign In</button>
      </form>
      <SignInForm />
    </div>
  );
};

export default SignIn;
