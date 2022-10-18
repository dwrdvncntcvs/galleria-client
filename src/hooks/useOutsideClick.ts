import { useRef, useEffect } from "react";

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      event.stopPropagation();
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
};
