import { useMemo } from 'react';
import { RootState } from '../../redux-store';
import { programs } from '../../training-programs';
import { ProgramId, TP } from '../../training-programs/data-types';
import { useAppSelector } from '../redux-hooks';

export const useGetProgram = (
  id: ProgramId | null
): TP<ProgramId, boolean> | null => {
  // Make a conditional selector
  const selector = !!id
    ? (state: RootState) => state.programs.byId[id]
    : () => null;

  // Get program data or null
  const programData = useAppSelector(selector);

  const program: TP<ProgramId, boolean> | null = useMemo(() => {
    if (!id || !programs.has(id) || !programData) {
      return null;
    }

    const programMethods = programs.get(id)!;

    return { ...programMethods, ...programData };
  }, [programData, id]);

  return program;
};
