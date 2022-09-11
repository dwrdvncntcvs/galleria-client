import React, { ChangeEvent, FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { userSignUpRequest } from "../../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { UserRegistration } from "../../../models/User";
import { ButtonContainer, FormContainer, TextInput } from "../../global";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "./signUpForm.scss";

const SignUpForm = () => {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password2, setPassword2] = useState("");
  const [show, setShow] = useState(false);

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
      type: !show ? "password" : "text",
      value: password,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
    {
      placeholder: "Re-type Password",
      type: !show ? "password" : "text",
      value: password2,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setPassword2(e.target.value),
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
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setUsername("");
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
      <ButtonContainer>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={() => setShow((prev) => !prev)}>
          {show ? <BsEyeSlashFill /> : <BsEyeFill />}
        </button>
      </ButtonContainer>
      {userState.status === "success" && <Navigate to={`/${email}/otp`} />}
    </FormContainer>
  );
};

export default SignUpForm;
