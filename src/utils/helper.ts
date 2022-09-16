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

export const stopPropagation = (e: any) => {
  e.stopPropagation();
};

export const serializeDate = <
  T extends {
    [key: string]: any;
    createdAt: Date | any;
    updatedAt: Date | any;
  }
>(
  data: T
) => {
  data.createdAt = data.createdAt.toJSON();
  data.updatedAt = data.updatedAt.toJSON();

  return data;
};
