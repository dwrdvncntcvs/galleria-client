import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userSignIn } from "../../../api/userRequest";
import { setMessage, setStatus } from "../../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { UserAuth } from "../../../models/User";
import { FormContainer, TextInput } from "../../global";
import "./signInForm.scss";

const SignInForm = () => {
  const { status, message } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "error")
      setTimeout(() => {
        dispatch(setStatus("none"));
        dispatch(setMessage(""));
      }, 5000);
  }, [status]);

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
    console.log("Clicked");

    await dispatch(userSignIn(data));
    if (status === "success") navigate("/home");
  };

  return (
    <FormContainer onSubmit={submit}>
      {status === "error" && <p>{message}</p>}
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
    </FormContainer>
  );
};

export default SignInForm;
