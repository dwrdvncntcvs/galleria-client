import React from "react";
import style from "./inputError.module.scss";

interface InputErrorProps {
  errorMessage: string;
}

export default function InputError({ errorMessage }: InputErrorProps) {
  return <p className={style["input-error"]}>{errorMessage}</p>;
}
