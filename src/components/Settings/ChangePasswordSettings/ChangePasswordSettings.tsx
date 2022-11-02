import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFormInput } from "../../../hooks/formInputHooks";
import { SettingsSection } from "../../../layout";
import style from "./changePasswordSettings.module.scss";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { useOutletContext } from "react-router-dom";
import { changeAccountPassword } from "../../../api/userRequest";
import { InputError } from "../../global";
import { setMessage, setStatus } from "../../../features/userSlice";

interface InputField {
  type: string;
  placeholder: string;
  value: string;
  changeAction: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  name: string;
  blurAction: (e: SyntheticEvent<HTMLInputElement>) => void;
}

const initialInputValues = { oldPassword: "", password: "", password2: "" };

export default function ChangePasswordSettings() {
  const { message, status } = useAppSelector((state) => state.userState);
  const { id } = useAppSelector((state) => state.userState.userData!);
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState(false);
  const { data, errors, handleChange, isFormValid, setData, handleBlur } =
    useFormInput<{
      oldPassword: string;
      password: string;
      password2: string;
    }>(initialInputValues);

  const inputFields: InputField[] = [
    {
      placeholder: "Old Password",
      type: showPass ? "text" : "password",
      value: data.oldPassword,
      changeAction: handleChange,
      error: errors.oldPassword,
      name: "oldPassword",
      blurAction: handleBlur,
    },
    {
      placeholder: "New Password",
      type: showPass ? "text" : "password",
      value: data.password,
      changeAction: handleChange,
      error: errors.password,
      name: "password",
      blurAction: handleBlur,
    },
    {
      placeholder: "Re-type New Password",
      type: showPass ? "text" : "password",
      value: data.password2,
      changeAction: handleChange,
      error: errors.password2,
      name: "password2",
      blurAction: handleBlur,
    },
  ];

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      return;
    }

    await dispatch(changeAccountPassword({ ...data, userId: id! }));

    setData(initialInputValues);
  };

  const showPasswordAction = () => {
    setShowPass((prev) => !prev);
  };

  const setDefaultStatus = useCallback(() => {
    dispatch(setStatus("none"));
    dispatch(setMessage(""));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDefaultStatus();
    }, 3000);
  }, [setDefaultStatus, status]);

  return (
    <SettingsSection
      title="Change Password"
      description="To change your password at any time."
    >
      <form className={style["settings-form"]} onSubmit={submitForm}>
        {inputFields.map(
          (
            { placeholder, type, changeAction, value, error, name, blurAction },
            i
          ) => (
            <div className={style["form-control"]} key={i}>
              <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={changeAction}
                name={name}
                onBlur={blurAction}
              />
              {error.length > 0 && <InputError errorMessage={error} />}
            </div>
          )
        )}
        <div className={style["action-buttons"]}>
          <button type="submit" disabled={isFormValid}>
            Change Password
          </button>
          <button type="button" onClick={showPasswordAction}>
            {showPass ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>
        {message!?.length > 0 && status === "error" && <p>{message!}</p>}
        {message!?.length > 0 && status === "success" && <p>{message!}</p>}
      </form>
    </SettingsSection>
  );
}
