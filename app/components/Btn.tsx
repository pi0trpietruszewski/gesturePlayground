import React, {useRef} from 'react';
import Animated, {Easing, interpolate} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {View, TouchableOpacity} from 'react-native';
type Props = {};

const Btn: React.FC<Props> = (props) => {
  const progress = Animated.useValue(0);
  const visible = useRef(false);

  const button = (
    <TouchableOpacity
      onPress={() => {
        visible.current
          ? startHideAnimation(progress, () => (visible.current = false))
          : startShowAnimation(progress, () => (visible.current = true));
      }}
      style={{flex: 1, width: 64, aspectRatio: 1}}>
      <LinearGradient
        style={{
          borderRadius: 100,
          flex: 1,
        }}
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        colors={['#5851DB', '#C13584', '#E1306C', '#FD1D1D', '#F77737']}
      />
    </TouchableOpacity>
  );

  const scale = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 2],
  });

  const btn = (x, y) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={{
          width: 30,
          height: 30,
          backgroundColor: '#fff',
          position: 'absolute',
          borderRadius: 100,
          top: 40 - y,
          left: 40 - x,
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Animated.View
        style={{
          transform: [{scale: scale}],
          // backgroundColor: 'rgba(0,0,0,0.3)',
          position: 'absolute',
          borderRadius: 100,
          width: 110,
          height: 110,
        }}>
        {btn(28, 28)}
        {btn(-28, -28)}
        {btn(28, -28)}
        {btn(-28, 28)}
      </Animated.View>
      {button}
    </View>
  );
};

export default Btn;

const {timing} = Animated;
export const startShowAnimation = (
  animationProgress: Animated.Node<number>,
  callback,
) => {
  const _config = {
    duration: 700,
    delay: 500,
    toValue: 100,
    easing: Easing.bounce,
  };
  timing(animationProgress, _config).start(callback);
};
export const startHideAnimation = (
  animationProgress: Animated.Node<number>,
  callback,
) => {
  const _config = {
    duration: 200,
    delay: 500,
    toValue: 0,
    easing: Easing.linear,
  };
  timing(animationProgress, _config).start(callback);
};
