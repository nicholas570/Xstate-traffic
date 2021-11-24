import { StateSchema } from 'xstate';

export enum LightStates {
  Green = 'green',
  Orange = 'orange',
  Red = 'red',
  Idle = 'idle'
}

export type LightSchema = StateSchema<any> & {
  states: {
    [LightStates.Green]: StateSchema<any>;
    [LightStates.Orange]: StateSchema<any>;
    [LightStates.Red]: StateSchema<any>;
    [LightStates.Idle]: StateSchema<any>;
  };
};
