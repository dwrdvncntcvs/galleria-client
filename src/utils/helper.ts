type DebounceCB = (args: any[]) => void;

export const debounce = (cb: DebounceCB, delay: number) => {
  let timeout: any;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb([...args]);
    }, delay);
  };
};
