import React, { useState, FormEvent, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userSignIn } from "../../../api/userRequest";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { UserAuth } from "../../../models/User";
import { InputError, TextInput } from "../../global";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { signInFields } from "./inputFields";
import { ButtonContainer, FormContainer } from "../../../UI";
import { useFormInput } from "../../../hooks/formInputHooks";
import style from "./signInForm.module.scss";

const SignInForm = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    data: userAuthData,
    errors,
    handleChange,
  } = useFormInput<UserAuth>({
    email: "",
    password: "",
  });

  const prevLocation =
    location.state !== null
      ? (location.state as { from: string }).from
      : "/home";

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const data: UserAuth = userAuthData;

    const response = await dispatch(userSignIn(data));

    if (response.meta.requestStatus === "fulfilled") navigate(prevLocation);
  };

  return (
    <FormContainer onSubmit={submit}>
      {signInFields(handleChange, userAuthData, errors, show).map(
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
            {error ? <InputError errorMessage={error!} /> : null}
          </Fragment>
        )
      )}
      <ButtonContainer>
        <button type="submit">Sign In</button>
        <button type="button" onClick={() => setShow((prev) => !prev)}>
          {show ? <BsEyeSlashFill /> : <BsEyeFill />}
        </button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default SignInForm;
