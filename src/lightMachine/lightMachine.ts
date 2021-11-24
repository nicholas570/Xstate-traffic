import { createMachine } from 'xstate';
import { LightContext } from './lightDefinition/lightContext';
import { LightEvents } from './lightDefinition/lightEvent';
import { lightMachineConfig } from './lightMachineConfig';
import { lightMachineOptions } from './lightMachineOptions';

export const lightMachine = createMachine<LightContext, LightEvents>(lightMachineConfig, lightMachineOptions);
