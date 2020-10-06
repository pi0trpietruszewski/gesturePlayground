import React from 'react';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {Easing} from 'react-native-reanimated';

const {
  useValue,
  cond,
  eq,
  or,
  set,
  neq,
  and,
  Value,
  event,
  Clock,
  startClock,
  stopClock,
  timing,
  block,
  interpolate,
  Extrapolate,
} = Animated;

interface Props {
  children: React.Element;
  onPress: () => void;
}

const TapHandler = ({children, onPress}: Props) => {
  const clock = new Clock();

  const gestureState = useValue(State.UNDETERMINED);

  const animation = new Value(1);
  const shouldAnimate = useValue(-1);
  const runOpacityTimer = () => {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 260,
      toValue: new Value(-1),
      easing: Easing.linear,
    };

    return block([
      cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(config.toValue, 1),
        startClock(clock),
      ]),
      cond(
        and(
          or(eq(gestureState, State.END), eq(gestureState, State.FAILED)),
          neq(config.toValue, 0),
        ),
        [
          set(state.finished, 0),
          set(state.time, 0),
          set(state.frameTime, 0),
          set(config.toValue, 0),
          startClock(clock),
        ],
      ),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      interpolate(state.position, {
        inputRange: [0, 1],
        outputRange: [1, 1.5],
        extrapolate: Extrapolate.CLAMP,
      }),
    ]);
  };

  const scale = runOpacityTimer();
  return (
    <TapGestureHandler
      shouldCancelWhenOutside
      onHandlerStateChange={event([
        {
          nativeEvent: {state: gestureState},
        },
      ])}>
      <Animated.View style={{transform: [{scale: scale}]}}>
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default TapHandler;
