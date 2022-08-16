import { useMemo, useState } from "react";

interface Helpers {
  toggleState: () => void;
}

export const useTState = (initValue: boolean) => {
  const [state, setState] = useState(initValue);

  const fns = useMemo(
    () => ({
      toggleState: () => setState((val) => !val),
    }),
    []
  );

  return [state, setState, fns as Helpers] as const;
};
