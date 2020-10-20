import {vec} from 'react-native-redash/src/v1/Vectors';
import {State} from 'react-native-gesture-handler';
import {onGestureEvent} from 'react-native-redash/src/v1/Gesture';
import Animated, {defined} from 'react-native-reanimated';
import {max, min} from 'react-native-redash/src/v1/Math';

const {
  proc,
  Clock,
  Value,
  event,
  add,
  block,
  cond,
  eq,
  multiply,
  set,
  stopClock,
  and,
  not,
  clockRunning,
  startClock,
  neq,
  call,
  sub,
  decay: reDecay,
  spring: reSpring,
  onChange,
  debug,
} = Animated;

export const withOffset = (
  value: Animated.Node<number>,
  state: Animated.Node<State>,
  offset: Animated.Value<number> = new Value(0),
) =>
  cond(
    eq(state, State.END),
    [set(offset, add(offset, value)), offset],
    add(offset, value),
  );

export const withDecay = (config: WithDecayParams) => {
  const {value, velocity, state, offset, deceleration} = {
    offset: new Value(0),
    deceleration: 0.998,
    ...config,
  };
  const clock = new Clock();
  const decayState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const isDecayInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishDecay = [set(offset, decayState.position), stopClock(clock)];

  return block([
    cond(isDecayInterrupted, finishDecay),
    cond(neq(state, State.END), [
      set(decayState.finished, 0),
      set(decayState.position, add(offset, value)),
    ]),
    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(decayState.finished)), [
        set(decayState.velocity, velocity),
        set(decayState.time, 0),
        startClock(clock),
      ]),
      reDecay(clock, decayState, {deceleration}),
      cond(decayState.finished, finishDecay),
    ]),
    decayState.position,
  ]);
};

// currently diffClamp() from reanimated seems currently buggy because of proc()
export const diff = (v: Animated.Node<number>) => {
  const stash = new Value(0);
  const prev = new Value<number>();
  return block([
    set(stash, cond(defined(prev), sub(v, prev), 0)),
    set(prev, v),
    stash,
  ]);
};

export const diffClamp = (
  a: Animated.Node<number>,
  minVal: Animated.Adaptable<number>,
  maxVal: Animated.Adaptable<number>,
) => {
  const value = new Value<number>();
  return set(
    value,
    min(max(add(cond(defined(value), value, a), diff(a)), minVal), maxVal),
  );
};
