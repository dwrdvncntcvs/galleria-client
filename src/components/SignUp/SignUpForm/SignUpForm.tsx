import React, { ChangeEvent, FormEvent, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUpRequest } from "../../../api/userRequest";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { UserRegistration } from "../../../models/User";
import { InputError, TextInput } from "../../global";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import style from "./signUpForm.module.scss";
import { useValidationMessage } from "../../../hooks/validationHook";
import {
  emptyInput,
  hasError,
  validationDebounce,
} from "../../../services/validationService";
import { signUpInputFields } from "./inputFields";
import { ButtonContainer, FormContainer } from "../../../layouts";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const [userRegData, setUserRegData] = useState<UserRegistration>({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password2: "",
  });
  const [errorMessage, setErrorMessage] = useState<UserRegistration>({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password2: "",
  });

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const validation = useValidationMessage();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    validationDebounce({
      validation,
      target: e.target.value,
      setter: setErrorMessage,
      name,
      secondValue: name === "password2" ? userRegData.password : "",
    });
    setUserRegData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const checkErrors = () =>
    hasError(
      errorMessage.first_name,
      errorMessage.last_name,
      errorMessage.username,
      errorMessage.email,
      errorMessage.password,
      errorMessage.password2
    ) ||
    emptyInput(
      userRegData.first_name,
      userRegData.last_name,
      userRegData.username,
      userRegData.email,
      userRegData.password,
      userRegData.password2
    );

  const signUpAction = async (e: FormEvent) => {
    e.preventDefault();

    const value = await dispatch(userSignUpRequest(userRegData));

    if (value.meta.requestStatus === "fulfilled")
      navigate(`/${userRegData.email}/otp`);
  };

  return (
    <FormContainer onSubmit={signUpAction}>
      {signUpInputFields(handleChange, userRegData, errorMessage, show).map(
        ({ placeholder, type, value, onChange, error, name }, i) => (
          <Fragment key={i}>
            <TextInput
              name={name}
              placeholder={placeholder}
              type={type}
              value={value}
              onChange={onChange}
              hasError={error !== ""}
            />
            {error !== "" ? <InputError errorMessage={error!} /> : ""}
          </Fragment>
        )
      )}
      <ButtonContainer>
        <button
          style={{
            cursor: checkErrors() ? "not-allowed" : "pointer",
          }}
          type="submit"
          disabled={checkErrors()}
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
