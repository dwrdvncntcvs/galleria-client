import { useAppSelector } from "./reduxHook";

export const useCheckToggle = () => {
  const { name, status } = useAppSelector((state) => state.toggleState);

  return (toggleName: string) => {
    return name === toggleName && status === true;
  };
};
