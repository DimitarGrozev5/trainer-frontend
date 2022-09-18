import { InitProps, SessionProps, TP } from '../data-types';
import { qdInit, qdState, qdAchieved } from './qd-types';

export const quickDead: TP<'quick-dead', true> = {
  id: 'quick-dead',
  active: false,
  state: {} as qdState,
  version: '',

  name: 'Q&D',
  shortDesc: 'The Quick and The Dead training progam by Pavel',
  longDesc:
    'This training protocol aims to build your strength endurance and mitochondria in your fast twitch muscle fibers. It consists of two exercices - swing and viking push press, that are performed as explosively as possible, preferably in around a second per rep.',

  InitComponent: ({ value, onChange }: InitProps<'quick-dead'>) => {
    return <></>;
  },
  getInitData: function (val: qdInit): qdState {
    throw new Error('Function not implemented.');
  },

  getDescFromState: function (state: qdState): string {
    throw new Error('Function not implemented.');
  },
  getNextState: function (
    state: qdState,
    achieved: qdAchieved | 'skip'
  ): qdState {
    throw new Error('Function not implemented.');
  },
  getNextScheduleState: function (state: qdState): qdState {
    throw new Error('Function not implemented.');
  },

  SessionComponent: ({
    program,
    onAchievedChanged,
  }: SessionProps<'quick-dead'>) => {
    return <></>;
  },
};
