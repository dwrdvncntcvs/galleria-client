import React, { useState, ChangeEvent, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userSignIn } from "../../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { UserAuth } from "../../../models/User";
import { FormContainer, TextInput } from "../../global";
import "./signInForm.scss";

const SignInForm = () => {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    <FormContainer onSubmit={submit}>
      {inputFields.map(({ placeholder, type, value, onChange }, i) => (
        <TextInput
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
      {userState.status === "success" && <Navigate to="/home" />}
    </FormContainer>
  );
};

export default SignInForm;
