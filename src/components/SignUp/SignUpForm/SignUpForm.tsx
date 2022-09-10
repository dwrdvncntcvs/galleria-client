import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUpRequest } from "../../../api/userRequest";
import { setMessage, setStatus } from "../../../features/userSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { UserRegistration } from "../../../models/User";
import { FormContainer, TextInput } from "../../global";
import "./signUpForm.scss";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

    const isValid =
      Object.keys(body).filter((key) => (body as any)[key] === "").length < 1;

    if (!isValid) return;

    console.table(body);
    await dispatch(userSignUpRequest(body));
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setUsername("");

    navigate(`/${email}/otp`);
  };

  return (
    <FormContainer onSubmit={signUpAction}>
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
    </FormContainer>
  );
};

export default SignUpForm;
