/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {View, Alert} from 'react-native';
import React from 'react';
import ScrollScreen from './app/screens/ScrollScreen';
import FloatingButton from './app/components/FloatingButton';
import Btn from './app/components/Btn';

const App = () => {
  const btnPress = (position) => () => Alert.alert(position);
  return (
    <View style={{flex: 1}}>
      <ScrollScreen />
      <FloatingButton
        children={
          <Btn
            onTopLeftPress={btnPress('top left')}
            onTopRightPress={btnPress('top right')}
            onBottomLeftPress={btnPress('bottom left')}
            onBottomRightPress={btnPress('bottom right')}
          />
        }
      />
    </View>
  );
};

export default App;
