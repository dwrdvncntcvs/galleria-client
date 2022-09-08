import React, { ChangeEvent, FormEvent, useState } from "react";
import { userSignUpRequest } from "../../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { UserRegistration } from "../../../models/User";
import { TextInput } from "../../global";
import "./signUpForm.scss";

const SignUpForm = () => {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

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

  const signUpAction = async (e: FormEvent) => {
    e.preventDefault();

    const body: UserRegistration = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    };

    console.table(body);
    await dispatch(userSignUpRequest(body));
  };

  return (
    <div className="si__main-container">
      {userState.successMessage !== "" || userState.successMessage !== null ? (
        <p>{userState.successMessage}</p>
      ) : null}
      <form onSubmit={signUpAction}>
        {inputFields.map(({ placeholder, type, value, onChange }, i) => (
          <TextInput
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
