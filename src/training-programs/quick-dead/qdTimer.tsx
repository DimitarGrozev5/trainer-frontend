import React from 'react';

import { qdAchieved } from './qd-types';

interface Props {
  repScheme: number;
  volume: number;
  onAchievedChanged: (val: qdAchieved) => void;
}

export const QDTimer: React.FC<Props> = ({
  repScheme,
  volume,
  onAchievedChanged,
}) => {
  // useEffect(() => {
  //   const goalAchieved =
  //     sets.reduce((sum, set) => sum + Number(set), 0) === sets.length;

  //   if (goalAchieved) {
  //     const achieved = { sets: sets.length };
  //     onAchievedChanged(achieved);
  //   }
  // }, [sets, onAchievedChanged]);

  return <></>;
};
