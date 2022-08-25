import React, { createContext, useEffect, useState } from "react";
import { ProgramId } from "../../training-programs/data-types";
import { useAppSelector } from "../redux-hooks";
import { ScheduledSession } from "./training-schedule-types";

export const ScheduleCacheContext = createContext<
  Map<ProgramId, Map<number, ScheduledSession>>
>(new Map<ProgramId, Map<number, ScheduledSession>>());

interface Props {
  children: React.ReactNode;
}

const ScheduleCacheProvider: React.FC<Props> = ({ children }) => {
  // Setup scheduleCache
  const [scheduleCache, setScheduleCache] = useState(
    new Map<ProgramId, Map<number, ScheduledSession>>()
  );

  const allPrograms = useAppSelector((state) => state.programs.byId);

  // Clear cache when programs data changes
  useEffect(() => {
    setScheduleCache(new Map<ProgramId, Map<number, ScheduledSession>>());
  }, [allPrograms]);

  return (
    <ScheduleCacheContext.Provider value={scheduleCache}>
      {children}
    </ScheduleCacheContext.Provider>
  );
};

export default ScheduleCacheProvider;
