import { useMemo } from 'react';
import { programs } from '../../training-programs';
import { ProgramId, TP } from '../../training-programs/data-types';
import { useAppSelector } from '../redux-hooks';

export const useGetProgram = (id: ProgramId): TP<ProgramId, boolean> | null => {
  const programData = useAppSelector((state) => state.programs.byId[id]);

  const program: TP<ProgramId, boolean> | null = useMemo(() => {
    if (!programs.has(id) || !programData) {
      return null;
    }

    const programMethods = programs.get(id)!;

    return { ...programMethods, ...programData };
  }, [programData, id]);

  return program;
};
