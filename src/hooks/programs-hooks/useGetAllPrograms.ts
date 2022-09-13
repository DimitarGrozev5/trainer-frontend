import { useMemo } from 'react';
import { programs } from '../../training-programs';
import { useAppSelector } from '../redux-hooks';

export const useGetAllPrograms = () => {
  const programsIds = useAppSelector((state) => state.programs.arr);
  const programsObj = useAppSelector((state) => state.programs.byId);

  const allPrograms = useMemo(
    () =>
      programsIds.flatMap((id) => {
        if (!programs.has(id) || !(id in programsObj)) {
          return [];
        }

        const programMethods = programs.get(id)!;
        const programData = programsObj[id];

        return { ...programMethods, ...programData };
      }),
    [programsIds, programsObj]
  );

  const activePrograms = useMemo(
    () => allPrograms.filter((pr) => pr.active),
    [allPrograms]
  );

  const inactivePrograms = useMemo(
    () => allPrograms.filter((pr) => !pr.active),
    [allPrograms]
  );

  return { allPrograms, activePrograms, inactivePrograms };
};
