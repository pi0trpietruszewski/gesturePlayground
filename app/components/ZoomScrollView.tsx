import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {debug} from 'react-native-reanimated';
import {diffClamp, withDecay} from '../helpers/GestureHelpers';

const MARGIN = 16;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  card: {
    marginVertical: MARGIN,
    width: '100%',
  },
});

const {
  useValue,
  cond,
  add,
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

const ZoomScrollView = ({items, renderItem, cardHeight}) => {
  const {height} = Dimensions.get('window');
  const CARD_HEIGHT = cardHeight + MARGIN * 2;
  const [containerHeight, setContainerHeight] = useState(height);
  const gestureState = useValue(State.UNDETERMINED);

  const gesturePositionY = useValue(0);

  const gestureVelocityY = useValue(0);

  const gestureTranslationY = useValue(0);

  const visibleCards = Math.floor(containerHeight / CARD_HEIGHT);

  const y = diffClamp(
    withDecay({
      value: gestureTranslationY,
      velocity: gestureVelocityY,
      state: gestureState,
    }),
    -items.length * CARD_HEIGHT + CARD_HEIGHT * visibleCards,
    0,
  );

  const gestureEvent = event([
    {
      nativeEvent: {
        state: gestureState,
        y: gesturePositionY,
        velocityY: gestureVelocityY,
        translationY: gestureTranslationY,
      },
    },
  ]);

  return (
    <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: {height: h},
        },
      }) => setContainerHeight(h)}>
      <PanGestureHandler
        onGestureEvent={gestureEvent}
        onHandlerStateChange={gestureEvent}>
        <Animated.View style={{width: '100%'}}>
          {items.map((item, index) => {
            const positionY = add(y, index * CARD_HEIGHT);
            const isDisappearing = -CARD_HEIGHT;
            const isOnTop = 0;
            const isOnBottom = (visibleCards - 1) * CARD_HEIGHT;
            const isAppearing = visibleCards * CARD_HEIGHT;
            const extraTranslationY = interpolate(positionY, {
              inputRange: [isOnBottom, isAppearing],
              outputRange: [0, -CARD_HEIGHT / 4],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateY = add(
              interpolate(y, {
                inputRange: [-CARD_HEIGHT * index, 0],
                outputRange: [-CARD_HEIGHT * index, 0],
                extrapolate: Extrapolate.CLAMP,
              }),
              extraTranslationY,
            );
            const scale = interpolate(positionY, {
              inputRange: [isDisappearing, isOnTop, isOnBottom, isAppearing],
              outputRange: [0.5, 1, 1, 0.5],
              extrapolate: Extrapolate.CLAMP,
            });
            const opacity = interpolate(positionY, {
              inputRange: [isDisappearing, isOnTop, isOnBottom, isAppearing],
              outputRange: [0.5, 1, 1, 0.5],
              extrapolate: Extrapolate.EXTEND,
            });
            return (
              <Animated.View
                key={index}
                style={[
                  styles.card,
                  {opacity, transform: [{translateY}, {scale}]},
                ]}>
                {renderItem(item)}
              </Animated.View>
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
export default ZoomScrollView;
