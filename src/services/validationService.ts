export type Validation = {
  user: (
    type: string,
    inputValue: string,
    secondValue?: string
  ) => [isError: boolean, errorMessage: string | null];
};

interface ValidationResult {
  isError: boolean;
  errorMessage: string;
}

const validateEmail = (inputValue: string): ValidationResult | any => {
  const condition = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(
    inputValue
  );

  return {
    isError: condition ? true : false,
    errorMessage: condition ? "Please enter a valid email address" : "",
  };
};

const validateFirstName = (inputValue: string): ValidationResult | any => {
  const condition =
    !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(inputValue);

  return {
    isError: condition ? true : false,
    errorMessage: condition ? "Please enter a valid first name" : "",
  };
};

const validateLastName = (inputValue: string): ValidationResult | any => {
  const condition =
    !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(inputValue);

  return {
    isError: condition ? true : false,
    errorMessage: condition ? "Please enter a valid last name" : "",
  };
};

const validateUsername = (inputValue: string): ValidationResult | any => {
  const condition =
    !/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
      inputValue
    );

  return {
    isError: condition ? true : false,
    errorMessage: condition ? "Username is not allowed" : "",
  };
};

const validatePassword = (inputValue: string): ValidationResult | any => {
  const condition =
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      inputValue
    );

  return {
    isError: condition ? true : false,
    errorMessage: condition
      ? "Password must be minimum of eight characters, at least one uppercase letter, one lowercase letter and one number"
      : "",
  };
};

const validatePassword2 = (
  inputValue: string,
  secondValue: string
): ValidationResult | any => {
  if (inputValue === "") return;

  const condition = inputValue !== secondValue;

  return {
    isError: condition ? true : false,
    errorMessage: condition ? "Password didn't matched" : "",
  };
};

export const validationService: Validation = {
  user: (type, inputValue, secondValue) => {
    let isError = false;
    let errorMessage: string | null = null;

    switch (type) {
      case "email": {
        if (inputValue === "") break;

        const validation: ValidationResult = validateEmail(inputValue);

        isError = validation.isError;
        errorMessage = validation.errorMessage;
        break;
      }
      case "firstName": {
        if (inputValue === "") break;
        const validation: ValidationResult = validateFirstName(inputValue);

        isError = validation.isError;
        errorMessage = validation.errorMessage;
        break;
      }
      case "lastName": {
        if (inputValue === "") break;
        const validation: ValidationResult = validateLastName(inputValue);

        isError = validation.isError;
        errorMessage = validation.errorMessage;
        break;
      }
      case "username": {
        if (inputValue === "") break;
        const validation: ValidationResult = validateUsername(inputValue);

        isError = validation.isError;
        errorMessage = validation.errorMessage;
        break;
      }
      case "password": {
        if (inputValue === "") break;
        const validation: ValidationResult = validatePassword(inputValue);

        isError = validation.isError;
        errorMessage = validation.errorMessage;
        break;
      }
      case "password2": {
        if (inputValue === "") break;
        const validation: ValidationResult = validatePassword2(
          inputValue,
          secondValue!
        );

        isError = validation.isError;
        errorMessage = validation.errorMessage;
        break;
      }
      default:
        break;
    }

    return [isError, errorMessage];
  },
};

export const hasError = (...state: any[]) =>
  state.filter((element) => element.message !== "").length > 0 ||
  state.filter((element) => element.value === "").length > 0
    ? true
    : false;
