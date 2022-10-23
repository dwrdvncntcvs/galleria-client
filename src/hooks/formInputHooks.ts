import { ChangeEvent, Dispatch, useState, SetStateAction } from "react";
import { validationDebounce } from "../services/validationService";
import { useValidationMessage } from "./validationHook";

export const useFormInput = <T>(
  inputValues: T
): {
  data: T;
  errors: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isFormValid: boolean;
  setData: Dispatch<SetStateAction<T>>;
} => {
  const [inputData, setInputData] = useState<T>({ ...inputValues });
  const [errors, setErrors] = useState<T>({ ...inputValues });

  const validation = useValidationMessage();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    validationDebounce({
      validation,
      target: e.target.value,
      setter: setErrors,
      name,
      secondValue:
        name === "password2"
          ? (inputData as { password: string }).password
          : "",
    });

    setInputData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const isFormValid =
    checkFormErrors<T>(errors, "hasError") ||
    checkFormErrors<T>(inputData, "emptyFields");

  return {
    data: inputData,
    errors,
    handleChange,
    isFormValid,
    setData: setInputData,
  };
};

const checkFormErrors = <T>(dataObj: T, type: "hasError" | "emptyFields") => {
  for (let key in dataObj) {
    if (dataObj[key] === "" && type === "emptyFields") return true;
    if (dataObj[key] !== "" && type === "hasError") return true;
  }

  return false;
};
