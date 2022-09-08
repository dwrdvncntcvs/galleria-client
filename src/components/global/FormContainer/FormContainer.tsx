import React, { FormEvent } from "react";
import "./formContainer.scss";

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
    <form className={`${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
