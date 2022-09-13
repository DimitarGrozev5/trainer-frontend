import { useMemo } from 'react';
import { programs } from '../../training-programs';
import { ProgramId, TrainingProgram } from '../../training-programs/data-types';
import { useAppSelector } from '../redux-hooks';

export const useGetProgram = (id: ProgramId) => {
  const programData = useAppSelector((state) => state.programs.byId[id]);

  const program = useMemo(() => {
    if (!programs.has(id) || !programData) {
      return null;
    }

    const programMethods = programs.get(id)!;

    return { ...programMethods, ...programData };
  }, [programData]);

  return program;
};
