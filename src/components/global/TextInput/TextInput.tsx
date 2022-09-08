import React, { ChangeEvent } from "react";

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
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
