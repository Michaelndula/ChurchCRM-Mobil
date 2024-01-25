import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {ScrollView, View, Text, Image, RefreshControl} from 'react-native';
import {styles} from '../assets/css/EventsScreen';

import Events from './ListView/Events';

export default function EventsScreen() {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    Events: [],
  });

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        Events: [],
      });

      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <View>
          <Events data={data.Events} />
        </View>
      </View>
    </ScrollView>
  );
}
