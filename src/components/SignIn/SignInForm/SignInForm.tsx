import React, { useState, ChangeEvent, FormEvent } from "react";
import { userSignIn } from "../../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { UserAuth } from "../../../models/User";
import "./signInForm.scss";

const SignInForm = () => {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
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

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const data: UserAuth = { email, password };

    await dispatch(userSignIn(data));
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
      <h1>{userState.refreshToken}</h1>
    </div>
  );
};

export default SignInForm;
