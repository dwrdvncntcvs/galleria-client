import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUpRequest } from "../../../api/userRequest";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { UserRegistration } from "../../../models/User";
import { ButtonContainer, FormContainer, TextInput } from "../../global";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "./signUpForm.scss";
import { useValidationMessage } from "../../../hooks/validationHook";
import { hasError } from "../../../services/validationService";

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState({ value: "", message: "" });
  const [password, setPassword] = useState({ value: "", message: "" });
  const [firstName, setFirstName] = useState({ value: "", message: "" });
  const [lastName, setLastName] = useState({ value: "", message: "" });
  const [username, setUsername] = useState({ value: "", message: "" });
  const [password2, setPassword2] = useState({ value: "", message: "" });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const validation = useValidationMessage();

  const inputFields = [
    {
      placeholder: "First Name",
      type: "text",
      value: firstName.value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        validation(setFirstName, "firstName", e.target.value);
        setFirstName((prev) => ({ ...prev, value: e.target.value }));
      },
      error: firstName.message,
    },
    {
      placeholder: "Last Name",
      type: "text",
      value: lastName.value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        validation(setLastName, "lastName", e.target.value);
        setLastName((prev) => ({ ...prev, value: e.target.value }));
      },
      error: lastName.message,
    },
    {
      placeholder: "Username",
      type: "text",
      value: username.value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        validation(setUsername, "username", e.target.value);
        setUsername((prev) => ({ ...prev, value: e.target.value }));
      },
      error: username.message,
    },
    {
      placeholder: "Email",
      type: "email",
      value: email.value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        validation(setEmail, "email", e.target.value);
        setEmail((prev) => ({ ...prev, value: e.target.value }));
      },
      error: email.message,
    },
    {
      placeholder: "Password",
      type: !show ? "password" : "text",
      value: password.value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        validation(setPassword, "password", e.target.value);
        setPassword((prev) => ({ ...prev, value: e.target.value }));
      },
      error: password.message,
    },
    {
      placeholder: "Re-type Password",
      type: !show ? "password" : "text",
      value: password2.value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        validation(setPassword2, "password2", e.target.value, password.value);
        setPassword2((prev) => ({ ...prev, value: e.target.value }));
      },
      error: password2.message,
    },
  ];

  const signUpAction = async (e: FormEvent) => {
    e.preventDefault();

    const body: UserRegistration = {
      first_name: firstName.value,
      last_name: lastName.value,
      username: username.value,
      email: email.value,
      password: password.value,
    };

    const value = await dispatch(userSignUpRequest(body));
    setEmail((prev) => ({ ...prev, value: "" }));
    setPassword((prev) => ({ ...prev, value: "" }));
    setPassword2((prev) => ({ ...prev, value: "" }));
    setFirstName((prev) => ({ ...prev, value: "" }));
    setLastName((prev) => ({ ...prev, value: "" }));
    setUsername((prev) => ({ ...prev, value: "" }));
    if (value.meta.requestStatus === "fulfilled")
      navigate(`/${email.value}/otp`);
  };

  return (
    <FormContainer onSubmit={signUpAction}>
      {inputFields.map(({ placeholder, type, value, onChange, error }, i) => (
        <>
          <TextInput
            key={i}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
          />
          {error !== "" ? <p>{error}</p> : ""}
        </>
      ))}
      <ButtonContainer>
        <button
          style={{
            cursor: hasError(firstName, lastName, username, email, password)
              ? "not-allowed"
              : "pointer",
          }}
          type="submit"
          disabled={hasError(firstName, lastName, username, email, password)}
        >
          Sign Up
        </button>
        <button type="button" onClick={() => setShow((prev) => !prev)}>
          {show ? <BsEyeSlashFill /> : <BsEyeFill />}
        </button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default SignUpForm;
