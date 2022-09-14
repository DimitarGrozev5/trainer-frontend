import { useCallback, useMemo } from 'react';
import { programs } from '../../training-programs';
import { ProgramId, TP } from '../../training-programs/data-types';
import { useAppSelector } from '../redux-hooks';

export const useGetAllPrograms = () => {
  // Get program data from redux
  const programsIds = useAppSelector((state) => state.programs.arr);
  const programsObj = useAppSelector((state) => state.programs.byId);

  // Function to get all programs with methods
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

  // Function to get active programs with methods
  const activePrograms: TP<ProgramId, true>[] = useMemo(
    () => allPrograms.filter((pr) => pr.active),
    [allPrograms]
  );

  // Function to get inactive programs with methods
  const inactivePrograms: TP<ProgramId, false>[] = useMemo(
    () => allPrograms.filter((pr) => !pr.active),
    [allPrograms]
  );

  // Function to get a specific program with methods
  const getProgram = useCallback<
    (id: ProgramId) => TP<ProgramId, boolean> | null
  >((id: ProgramId) => {
    if (!programs.has(id) || !(id in programsObj)) {
      return null;
    }

    const programMethods = programs.get(id)!;
    const programData = programsObj[id];

    return { ...programMethods, ...programData };
  }, [programsObj]);

  return { allPrograms, activePrograms, inactivePrograms, getProgram };
};
