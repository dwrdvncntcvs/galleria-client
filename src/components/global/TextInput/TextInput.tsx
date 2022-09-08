import React, { ChangeEvent } from "react";
import "./textInput.scss";

interface TextInputProps {
  key?: string | number;
  placeholder: string;
  type: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  placeholder,
  type,
  value,
  onChange,
}: TextInputProps) {
  return (
    <input
      className="ti__main-input"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
