import React, {useRef} from 'react';
import Animated, {Easing} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {defaultGradient} from '../constants/constants';

type Props = {
  onTopLeftPress: () => void;
  onTopRightPress: () => void;
  onBottomLeftPress: () => void;
  onBottomRightPress: () => void;
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  mainButton: {flex: 1, width: 64, aspectRatio: 1},
  smallButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: 100,
  },
  gradientBg: {
    borderRadius: 100,
    flex: 1,
  },
  smallButtonsContainer: {
    position: 'absolute',
    borderRadius: 100,
    width: 110,
    height: 110,
  },
});

const Btn: React.FC<Props> = ({
  onTopLeftPress,
  onTopRightPress,
  onBottomLeftPress,
  onBottomRightPress,
}) => {
  const progress = Animated.useValue(0);
  const visible = useRef(false);

  const button = (
    <TouchableOpacity
      onPress={() => {
        visible.current
          ? startHideAnimation(progress, () => (visible.current = false))
          : startShowAnimation(progress, () => (visible.current = true));
      }}
      style={styles.mainButton}>
      <LinearGradient
        style={styles.gradientBg}
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        colors={defaultGradient}
      />
    </TouchableOpacity>
  );

  const scale = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 2],
  });

  const btn = (x, y, onPress) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[{top: 40 - y, left: 40 - x}, styles.smallButton]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            transform: [{scale: scale}],
          },
          styles.smallButtonsContainer,
        ]}>
        {btn(28, 28, onTopLeftPress)}
        {btn(-28, 28, onTopRightPress)}
        {btn(-28, -28, onBottomRightPress)}
        {btn(28, -28, onBottomLeftPress)}
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
