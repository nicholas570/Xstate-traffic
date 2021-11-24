export enum LightEvent {
  TIMER = 'TIMER'
}

export type LightEvents = { type: LightEvent.TIMER; data?: any };
