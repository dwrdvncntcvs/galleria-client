import React, { useState, ChangeEvent, FormEvent } from "react";
import "./signInForm.scss";

const SignInForm = () => {
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
    <div>
      SignInForm
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
        <button className="s__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
