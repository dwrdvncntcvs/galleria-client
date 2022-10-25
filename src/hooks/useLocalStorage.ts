import { useCallback } from "react";

const useLocalStorage = (name: string) => {
  const add = useCallback(
    (value: string | object) => {
      localStorage.setItem(name, JSON.stringify(value));
    },
    [name]
  );

  const remove = useCallback(() => {
    localStorage.removeItem(name);
  }, [name]);

  const get = useCallback(() => {
    return localStorage.getItem(name);
  }, [name]);

  const getJSON = useCallback(<T>() => {
    return JSON.parse(localStorage.getItem(name)!) as T;
  }, [name]);

  return {
    addItem: add,
    removeItem: remove,
    getItem: get,
    getItemJSON: getJSON,
  };
};

export default useLocalStorage;
