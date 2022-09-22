import React, { ChangeEvent } from "react";
import "./textInput.scss";

interface TextInputProps {
  key?: string | number;
  placeholder?: string;
  type?: string;
  value?: any;
  name?: string;
  hasError?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  name,
  placeholder,
  type,
  value,
  onChange,
  hasError = false,
}: TextInputProps) {
  return (
    <input
      name={name}
      className={`ti__main-input ${hasError ? "ti__error" : ""}`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
