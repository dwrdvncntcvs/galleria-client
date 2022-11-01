import React, { ChangeEvent, SyntheticEvent } from "react";
import style from "./textInput.module.scss";

interface TextInputProps {
  key?: string | number;
  placeholder?: string;
  type?: string;
  value?: any;
  name?: string;
  hasError?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  name,
  placeholder,
  type,
  value,
  onChange,
  hasError = false,
  onBlur,
}: TextInputProps) {
  return (
    <input
      name={name}
      className={`${style["text-input"]} ${
        hasError ? style["input-error"] : ""
      }`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
