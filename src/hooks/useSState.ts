import { useMemo, useState } from "react";

interface Helpers<S> {
  setStateTo: (val: S) => () => void;
}

export const useSState = <S>(initValue: S) => {
  const [state, setState] = useState(initValue);

  const fns = useMemo(
    () => ({
      setStateTo: (val: S) => () => setState(val),
    }),
    []
  );

  return [state, setState, fns as Helpers<S>] as const;
};
