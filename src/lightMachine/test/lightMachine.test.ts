import { interpret } from 'xstate';
import { LightEvent } from '../lightDefinition/lightEvent';
import { LightStates } from '../lightDefinition/lightSchema';
import { lightMachine } from '../lightMachine';

describe('lightMachine transitions', () => {
  it('should go to green on initial state', (done) => {
    const lightService = interpret(lightMachine).onTransition((state) => {
      if (state.matches(LightStates.Green)) {
        expect(state.context.transitionsCount).toEqual(0);
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
        expect(state.context.transitionsCount).toEqual(1);
        done();
      }
    });

    lightService.start();
  });

  it('should go to red from orange', (done) => {
    let hasAssignedResult = false;
    const lightService = interpret(
      lightMachine.withConfig({
        actions: {
          assignResult: () => {
            hasAssignedResult = true;
          }
        }
      })
    ).onTransition((state) => {
      if (state.matches(LightStates.Green)) {
        lightService.send({ type: LightEvent.TIMER });
      }
      if (state.matches(LightStates.Orange)) {
        lightService.send({ type: LightEvent.TIMER });
      }
      if (state.matches(LightStates.Red)) {
        expect(state.context.transitionsCount).toEqual(2);
        expect(hasAssignedResult).toBeTruthy();
        done();
      }
    });

    lightService.start();
  });
});
