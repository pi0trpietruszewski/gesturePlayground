import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {debug} from 'react-native-reanimated';
import {diffClamp, withDecay} from '../helpers/GestureHelpers';
import LinearGradient from 'react-native-linear-gradient';
import TapHandler from './TapHandler';

const MARGIN = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
    zIndex: 10,
  },
  card: {
    marginVertical: MARGIN,
    width: '100%',
  },
});

const {useValue} = Animated;
const {height, width} = Dimensions.get('window');

const FloatingButton = ({
  size = 64,
  children,
  initialX = width,
  initialY = height,
}) => {
  const gesturePositionY = useValue(initialY - size);
  const gesturePositionX = useValue(initialX - size);

  const _onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          absoluteX: gesturePositionX,
          absoluteY: gesturePositionY,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={_onPanGestureEvent}
        onHandlerStateChange={_onPanGestureEvent}>
        <Animated.View
          style={[
            styles.button,
            {
              width: size,
              height: size,
              transform: [
                {
                  translateX: Animated.add(
                    gesturePositionX,
                    new Animated.Value(size / 2),
                  ),
                  translateY: Animated.add(
                    gesturePositionY,
                    new Animated.Value(-size / 2),
                  ),
                },
              ],
            },
          ]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
export default FloatingButton;
