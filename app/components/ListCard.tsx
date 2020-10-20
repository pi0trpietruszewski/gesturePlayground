import React from 'react';
import {View, Text, Image} from 'react-native';
import TapHandler from './TapHandler';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  item: any;
}

const ListCard = ({item}: Props) => {
  return (
    <>
      <TapHandler onPress={() => {}}>
        <View
          style={{
            paddingHorizontal: 16,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          }}>
          <LinearGradient
            style={{
              borderRadius: 24,
              width: '100%',
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#5851DB', '#C13584', '#E1306C', '#FD1D1D', '#F77737']}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 100, height: 100}}
                source={{uri: item.avatar}}
              />
              <View>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 26}}>
                  {item.name}
                </Text>
                <Text style={{color: 'white', fontSize: 11}}>{item.email}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TapHandler>
    </>
  );
};

export default ListCard;
