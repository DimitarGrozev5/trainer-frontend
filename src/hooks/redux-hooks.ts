import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux-store/index";
import { programs } from "../training-programs";
import { ProgramId, TrainingProgram } from "../training-programs/data-types";
import { ProgramsState, ProgramState } from "../redux-store/programsSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const populateProgramsArr =
  (filter: boolean | null = null) =>
  (state: RootState) => {
    // Filter programs based on option
    // True - active
    // False - !active
    if (typeof filter === "boolean") {
      return state.programs.arr.flatMap((id) => {
        return state.programs.byId[id].active === filter
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
export const populateProgramsState = (state: ProgramsState) =>
  state.arr.map((id) => {
    return {
      ...programs.get(id),
      ...state.byId[id],
    } as TrainingProgram;
  });

export const populateProgram = (id: ProgramId) => (state: RootState) => {
  return {
    ...programs.get(id),
    ...state.programs.byId[id],
  } as TrainingProgram;
};
export const populateProgramFromState = (id: ProgramId, state: ProgramsState) =>
  ({ ...programs.get(id), ...state.byId[id] } as TrainingProgram);

export const voidGetter = (state: RootState) => {};
