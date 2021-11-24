import { MachineOptions } from 'xstate';
import { LightContext } from './lightDefinition/lightContext';
import { LightEvents } from './lightDefinition/lightEvent';

export const lightMachineOptions: MachineOptions<LightContext, LightEvents> = {
  guards: {},
  services: {},
  actions: {},
  activities: {},
  delays: {}
};
