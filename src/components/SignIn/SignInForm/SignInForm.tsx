import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { userSignIn } from "../../../api/userRequest";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { UserAuth } from "../../../models/User";
import { ButtonContainer, FormContainer, TextInput } from "../../global";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "./signInForm.scss";
import { useValidationMessage } from "../../../hooks/validationHook";
import { validationDebounce } from "../../../services/validationService";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState({ value: "", message: "" });
  const [password, setPassword] = useState({ value: "", message: "" });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const validation = useValidationMessage();

  const inputFields = [
    {
      placeholder: "Email",
      type: "email",
      value: email.value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        validationDebounce({
          validation,
          target: e.target.value,
          setter: setEmail,
          type: "email",
        });
        setEmail((prev) => ({ ...prev, value: e.target.value }));
      },
      error: email.message,
    },
    {
      placeholder: "Password",
      type: show ? "text" : "password",
      value: password.value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        validationDebounce({
          validation,
          target: e.target.value,
          setter: setPassword,
          type: "password",
        });
        setPassword((prev) => ({ ...prev, value: e.target.value }));
      },
      error: password.message,
    },
  ];

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const data: UserAuth = { email: email.value, password: password.value };

    const response = await dispatch(userSignIn(data));

    if (response.meta.requestStatus === "fulfilled") navigate("/home");
  };

  return (
    <FormContainer onSubmit={submit}>
      {inputFields.map(({ placeholder, type, value, onChange, error }, i) => (
        <>
          <TextInput
            key={i}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
          />
          {error ? <p>{error}</p> : null}
        </>
      ))}
      <ButtonContainer>
        <button className="s__button" type="submit">
          Sign In
        </button>
        <button type="button" onClick={() => setShow((prev) => !prev)}>
          {show ? <BsEyeSlashFill /> : <BsEyeFill />}
        </button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default SignInForm;
