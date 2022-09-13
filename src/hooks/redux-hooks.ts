import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux-store/index';
import { programs } from '../training-programs';
import { ProgramId, TrainingProgram } from '../training-programs/data-types';
import { ProgramsState } from '../redux-store/programsSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const populateProgram = (id: ProgramId) => (state: RootState) => {
  return {
    ...programs.get(id),
    ...state.programs.byId[id],
  } as TrainingProgram<ProgramId>;
};
export const populateProgramFromState = (id: ProgramId, state: ProgramsState) =>
  ({ ...programs.get(id), ...state.byId[id] } as TrainingProgram<ProgramId>);

export const voidGetter = (state: RootState) => {};
