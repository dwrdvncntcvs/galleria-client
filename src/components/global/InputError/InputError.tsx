import React from "react";
import "./inputError.scss";

interface InputErrorProps {
  errorMessage: string;
}

export default function InputError({ errorMessage }: InputErrorProps) {
  return <p id="ie__p">{errorMessage}</p>;
}
