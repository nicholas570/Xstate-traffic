import { MachineConfig } from 'xstate';
import { LightContext } from './lightDefinition/lightContext';
import { LightEvent, LightEvents } from './lightDefinition/lightEvent';
import { LightSchema, LightStates } from './lightDefinition/lightSchema';

export const lightMachineConfig: MachineConfig<LightContext, LightSchema, LightEvents> = {
  initial: LightStates.Green,
  context: {
    transitionsCount: 0
  },
  states: {
    [LightStates.Green]: {
      entry: 'clearResult',
      on: {
        [LightEvent.TIMER]: { target: LightStates.Orange, actions: 'incrementTransitionsCount' }
      }
    },
    [LightStates.Orange]: {
      on: {
        [LightEvent.TIMER]: { target: LightStates.Red, actions: 'incrementTransitionsCount' }
      }
    },
    [LightStates.Red]: {
      invoke: {
        id: 'dumbServiceId',
        src: 'dumbService',
        onDone: {
          cond: 'isSuccess',
          actions: 'assignResult'
        },
        onError: {
          target: LightStates.Idle
        }
      },
      on: {
        [LightEvent.TIMER]: { target: LightStates.Green, actions: 'incrementTransitionsCount' }
      }
    },
    [LightStates.Idle]: {
      type: 'final'
    }
  }
};
