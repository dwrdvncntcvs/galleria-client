import { useCallback, useState } from "react";

export const useForceUpdate = () => {
  const [state, setState] = useState(0);

  return useCallback(() => setState(state + 1), []);
};
