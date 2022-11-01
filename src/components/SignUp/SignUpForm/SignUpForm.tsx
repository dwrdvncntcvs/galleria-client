import React, { FormEvent, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUpRequest } from "../../../api/userRequest";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { UserRegistration } from "../../../models/User";
import { InputError, TextInput } from "../../global";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { signUpInputFields } from "./inputFields";
import { ButtonContainer, FormContainer } from "../../../UI";
import { useFormInput } from "../../../hooks/formInputHooks";
import style from "./signUpForm.module.scss";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    data: userRegData,
    errors: errorMessage,
    handleBlur,
    handleChange,
    isFormValid,
  } = useFormInput<UserRegistration>({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password2: "",
  });

  const signUpAction = async (e: FormEvent) => {
    e.preventDefault();

    const value = await dispatch(userSignUpRequest(userRegData));

    if (value.meta.requestStatus === "fulfilled")
      navigate(`/${userRegData.email}/otp`);
  };

  return (
    <FormContainer onSubmit={signUpAction}>
      {signUpInputFields(
        handleChange,
        userRegData,
        errorMessage,
        show,
        handleBlur
      ).map(
        ({ placeholder, type, value, onChange, error, name, onBlur }, i) => (
          <Fragment key={i}>
            <TextInput
              name={name}
              placeholder={placeholder}
              type={type}
              value={value}
              onChange={onChange}
              hasError={error !== ""}
              onBlur={onBlur}
            />
            {error !== "" ? <InputError errorMessage={error!} /> : ""}
          </Fragment>
        )
      )}
      <ButtonContainer>
        <button type="submit" disabled={isFormValid}>
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
