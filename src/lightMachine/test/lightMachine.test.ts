import { interpret } from 'xstate';
import { LightEvent } from '../lightDefinition/lightEvent';
import { LightStates } from '../lightDefinition/lightSchema';
import { lightMachine } from '../lightMachine';

describe('lightMachine transitions', () => {
  console.log('test');

  it('should go to green on initial state', (done) => {
    const lightService = interpret(lightMachine).onTransition((state) => {
      console.log(state);

      if (state.matches(LightStates.Green)) {
        done();
      }
    });

    lightService.start();
  });

  it('should go to orange from green', (done) => {
    const lightService = interpret(lightMachine).onTransition((state) => {
      if (state.matches(LightStates.Green)) {
        lightService.send({ type: LightEvent.TIMER });
      }
      if (state.matches(LightStates.Orange)) {
        done();
      }
    });

    lightService.start();
  });

  it('should go to red from orange', (done) => {
    const lightService = interpret(lightMachine).onTransition((state) => {
      if (state.matches(LightStates.Green)) {
        lightService.send({ type: LightEvent.TIMER });
      }
      if (state.matches(LightStates.Orange)) {
        lightService.send({ type: LightEvent.TIMER });
      }
      if (state.matches(LightStates.Red)) {
        done();
      }
    });

    lightService.start();
  });
});
