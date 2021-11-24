import { StateSchema } from 'xstate';

export enum LightStates {
  Green = 'green',
  Orange = 'orange',
  Red = 'red',
}

export type LightSchema = StateSchema<any> & {
  states: {
    [LightStates.Green]: StateSchema<any>;
    [LightStates.Orange]: StateSchema<any>;
    [LightStates.Red]: StateSchema<any>;
  };
};
