import React, { useState, ChangeEvent, FormEvent, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { userSignIn } from "../../../api/userRequest";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { UserAuth } from "../../../models/User";
import { InputError, TextInput } from "../../global";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import style from "./signInForm.module.scss";
import { useValidationMessage } from "../../../hooks/validationHook";
import { validationDebounce } from "../../../services/validationService";
import { signInFields } from "./inputFields";
import { ButtonContainer, FormContainer } from "../../../layouts";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const [userAuthData, setUserAuthData] = useState<UserAuth>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<UserAuth>({
    email: "",
    password: "",
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
    });

    setUserAuthData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const data: UserAuth = userAuthData;

    const response = await dispatch(userSignIn(data));

    if (response.meta.requestStatus === "fulfilled") navigate("/home");
  };

  return (
    <FormContainer onSubmit={submit}>
      {signInFields(handleChange, userAuthData, errorMessage, show).map(
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
