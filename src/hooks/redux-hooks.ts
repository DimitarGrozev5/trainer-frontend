import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux-store/index";
import { programs } from "../training-programs";
import { ProgramId, TrainingProgram } from "../training-programs/data-types";
import { ProgramsState } from "../redux-store/programsSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const populateProgramsArr =
  (option: boolean | null = null) =>
  (state: RootState) => {
    // Filter programs based on option
    // True - active
    // False - !active
    if (option !== null) {
      return state.programs.arr.flatMap((id) => {
        return state.programs.byId[id].active === option
          ? ({
              ...programs.get(id),
              ...state.programs.byId[id],
            } as TrainingProgram)
          : [];
      });
    }
    return state.programs.arr.map((id) => {
      return {
        ...programs.get(id),
        ...state.programs.byId[id],
      } as TrainingProgram;
    });
  };

export const populateProgram = (id: ProgramId) => (state: RootState) => {
  return {
    ...state.programs.byId[id],
    ...programs.get(id),
  } as TrainingProgram;
};

export const voidGetter = (state: RootState) => {};
