import { useAppSelector } from "./reduxHook";

export const useCheckToggle = () => {
  const { queue } = useAppSelector((state) => state.toggleState);

  return (toggleName: string) => {
    return (
      queue.filter((item) => item.name === toggleName && item.status === true)
        .length > 0
    );
  };
};
