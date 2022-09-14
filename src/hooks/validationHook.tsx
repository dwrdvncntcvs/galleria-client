import { validationService } from "../services/validationService";

export const useValidationMessage = () => {
  return (setter: any, name: string, input: string, secondValue?: string) => {
    const [isError, errorMessage] = validationService.user(
      name,
      input,
      secondValue
    );

    console.log(errorMessage);

    if (isError) setter((prev: any) => ({ ...prev, [name]: errorMessage }));
    else setter((prev: any) => ({ ...prev, [name]: "" }));
  };
};
