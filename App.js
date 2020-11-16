/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import ScrollScreen from './app/screens/ScrollScreen';
import FloatingButton from './app/components/FloatingButton';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import Btn from './app/components/Btn';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollScreen />
      <FloatingButton children={<Btn />} />
    </View>
  );
};

export default App;
