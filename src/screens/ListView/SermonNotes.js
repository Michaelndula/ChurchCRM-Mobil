import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {BASE_URL, HandleDataLoading} from '../../hooks/HandleApis';

const Stack = createStackNavigator();

export default function SermonsNotes({navigation}) {
  const handleDataLoading = HandleDataLoading();

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: '#48A6F9',
      }}>
      <Text style={styles.headingText}>Sermon Notes</Text>
      <ScrollView horizontal={true}>
        {handleDataLoading.data.sermonNotesLoading ? (
          <Text>Loading sermon Notes...</Text>
        ) : handleDataLoading.data.sermonNotes &&
          handleDataLoading.data.sermonNotes.length > 0 ? (
          handleDataLoading.data.sermonNotes.map(sermonnotes => (
            <View key={sermonnotes.id}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <View style={{marginRight: 10}}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/one.jpg')}
                  />
                  <Text>
                    {new Date(sermonnotes.created_at).toLocaleDateString(
                      undefined,
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </Text>
                  <Text>{sermonnotes.Topic}</Text>
                  <Text>{sermonnotes.notesupload}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>No Sermon Notes available</Text>
        )}
      </ScrollView>
    </View>
  );
}
