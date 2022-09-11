import { validationService } from "../services/validationService";

export const useValidationMessage = () => {
  return (setter: any, type: string, input: string, secondValue?: string) => {
    const [isError, errorMessage] = validationService.user(
      type,
      input,
      secondValue
    );

    if (isError) setter((prev: any) => ({ ...prev, message: errorMessage }));
    else setter((prev: any) => ({ ...prev, message: "" }));
  };
};
