import React, { FormEvent } from "react";
import style from "./formContainer.module.scss";

interface FormContainerProps {
  children?: any;
  className?: string;
  onSubmit?: (e: FormEvent) => void;
}

export default function FormContainer({
  children,
  className,
  onSubmit,
}: FormContainerProps) {
  return (
    <form
      className={`${className} ${style["form-container"]}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
