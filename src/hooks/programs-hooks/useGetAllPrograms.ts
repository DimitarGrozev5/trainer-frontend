import { useMemo } from 'react';
import { programs } from '../../training-programs';
import { ProgramId, TP } from '../../training-programs/data-types';
import { useAppSelector } from '../redux-hooks';

export const useGetAllPrograms = () => {
  const programsIds = useAppSelector((state) => state.programs.arr);
  const programsObj = useAppSelector((state) => state.programs.byId);

  const allPrograms: TP<ProgramId, boolean>[] = useMemo(
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

  const activePrograms: TP<ProgramId, true>[] = useMemo(
    () => allPrograms.filter((pr) => pr.active),
    [allPrograms]
  );

  const inactivePrograms: TP<ProgramId, false>[] = useMemo(
    () => allPrograms.filter((pr) => !pr.active),
    [allPrograms]
  );

  return { allPrograms, activePrograms, inactivePrograms };
};
