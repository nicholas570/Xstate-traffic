import { assign, MachineOptions } from 'xstate';
import { LightContext } from './lightDefinition/lightContext';
import { LightEvents } from './lightDefinition/lightEvent';

export const lightMachineOptions: MachineOptions<LightContext, LightEvents> = {
  guards: {
    isSuccess: (context: LightContext, event: LightEvents) => !!event.data
  },
  services: {
    dumbService: async (context: LightContext): Promise<{ name: string }> => {
      // fetch something
      await new Promise((res) => setTimeout(res, 2000));
      return Promise.resolve({ name: 'name' });
    }
  },
  actions: {
    incrementTransitionsCount: assign({
      transitionsCount: (context: LightContext) => context.transitionsCount + 1
    }),
    assignResult: assign({
      result: (context: LightContext, event) => event.data
    }),
    clearResult: assign({
      result: (context: LightContext, event) => undefined
    })
  },
  activities: {},
  delays: {}
};
