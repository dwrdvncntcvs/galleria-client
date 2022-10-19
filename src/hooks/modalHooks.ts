import { useAppSelector } from "./reduxHook";

export const useModalProps = () => {
  const { props } = useAppSelector((state) => state.modalState);

  return props;
};

export const useActiveModal = () => {
  const { name, status } = useAppSelector((state) => state.modalState);

  return (modalName: string) => {
    return name === modalName && status;
  };
};
