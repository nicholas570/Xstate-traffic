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
      on: {
        [LightEvent.TIMER]: { target: LightStates.Green }
      }
    },
    [LightStates.Orange]: {
      on: {
        [LightEvent.TIMER]: { target: LightStates.Red }
      }
    },
    red: {
      on: {
        [LightEvent.TIMER]: { target: LightStates.Green }
      }
    }
  }
};
