import React, { ChangeEvent, FormEvent, useState } from "react";
import "./signUpForm.scss";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const inputFields = [
    {
      placeholder: "First Name",
      type: "text",
      value: firstName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFirstName(e.target.value),
    },
    {
      placeholder: "Last Name",
      type: "text",
      value: lastName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setLastName(e.target.value),
    },
    {
      placeholder: "Username",
      type: "text",
      value: username,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
    },
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

  const signUpAction = (e: FormEvent) => {
    e.preventDefault();

    const body = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    console.table(body);
  };

  return (
    <div className="si__main-container">
      <form onSubmit={signUpAction}>
        {inputFields.map(({ placeholder, type, value, onChange }, i) => (
          <input
            key={i}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
          />
        ))}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
