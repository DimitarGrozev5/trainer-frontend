import { useMemo, useState } from "react";
// TODO - finish this garbadge
export const useSState = <S>(initValue: S) => {
  const [state, setState] = useState(initValue);

  const fns = useMemo(
    () => ({
      setStateTo: (val: S) => setState(val),
    }),
    []
  );

  type Output = [S, typeof setState, typeof fns];

  return [state, setState, fns] as Output;
};
