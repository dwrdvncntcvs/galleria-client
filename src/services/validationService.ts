export type Validation = {
  user: (
    type: string,
    inputValue: string,
    secondValue?: string
  ) => [isError: boolean, errorMessage: string | null];
};

export const validationService: Validation = {
  user: (type, inputValue, secondValue) => {
    let isError = false;
    let errorMessage: string | null = null;

    switch (type) {
      case "email":
        if (inputValue === "") break;

        if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(inputValue)
        ) {
          isError = true;
          errorMessage = "Please enter a valid email address";
          break;
        }

        isError = false;
        errorMessage = "";
        break;
      case "firstName":
        if (inputValue === "") break;
        if (
          !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(
            inputValue
          )
        ) {
          isError = true;
          errorMessage = "Please enter a valid first name";
          break;
        }
        isError = false;
        errorMessage = "";
        break;
      case "lastName":
        if (inputValue === "") break;
        if (
          !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(
            inputValue
          )
        ) {
          isError = true;
          errorMessage = "Please enter a valid last name";
          break;
        }
        isError = false;
        errorMessage = "";
        break;

      case "username":
        if (inputValue === "") break;

        if (
          !/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
            inputValue
          )
        ) {
          isError = true;
          errorMessage = "Username is not allowed";
          break;
        }
        isError = false;
        errorMessage = "";
        break;
      case "password":
        if (inputValue === "") break;
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            inputValue
          )
        ) {
          isError = true;
          errorMessage =
            "Password must be minimum of eight characters, at least one uppercase letter, one lowercase letter and one number";
          break;
        }
        isError = false;
        errorMessage = "";
        break;
      case "password2":
        if (inputValue === "") break;
        console.log(inputValue !== secondValue);
        if (inputValue !== secondValue) {
          isError = true;
          errorMessage = "Password didn't matched";
          break;
        }
        isError = false;
        errorMessage = "";
        break;
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
