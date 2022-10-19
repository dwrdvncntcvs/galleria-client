import { useAppSelector } from "./reduxHook";

export const useModalProps = <T>() => {
  const { props } = useAppSelector((state) => state.modalState);

  return props as T;
};

export const useActiveModal = () => {
  const { name, status } = useAppSelector((state) => state.modalState);

  return (modalName: string) => {
    return name === modalName && status;
  };
};
