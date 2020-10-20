import React from 'react';
import {View, Text} from 'react-native';
import ZoomScrollView from '../components/ZoomScrollView';
import ListCard from '../components/ListCard';
import users from '../assets/users';

const ScrollScreen = () => {
  return (
    <ZoomScrollView
      items={users}
      cardHeight={150}
      renderItem={(item) => <ListCard item={item} />}
    />
  );
};
export default ScrollScreen;
