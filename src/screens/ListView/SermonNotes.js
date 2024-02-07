import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {BASE_URL, fetchDataByEndpoint} from '../../hooks/HandleApis';
import {useNavigation} from '@react-navigation/native';

export const fetchSermonsNotes = async () => {
  return fetchDataByEndpoint('fetchSermonnotes');
};

export default function SermonNotes() {
  const [sermonsNotesData, setSermonsNotesData] = useState([]);
  const [sermonsNotesLoading, setSermonsNotesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sermonNotes = await fetchSermonsNotes();
        setSermonsNotesData(sermonNotes);
        setSermonsNotesLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const navigation = useNavigation();

  return (
    <View style={styles.sermonNoteContainer}>
      <Text style={styles.sermonNotesHeading}>Sermon Notes</Text>
      <ScrollView horizontal={true}>
        {sermonsNotesLoading ? (
          <Text style={styles.loadingText}>Loading sermon Notes...</Text>
        ) : sermonsNotesData && sermonsNotesData.length > 0 ? (
          sermonsNotesData.map(sermonnotes => (
            <TouchableOpacity
              key={sermonnotes.id}
              onPress={() =>
                navigation.navigate('SermonNotesView', {
                  announcement: sermonnotes,
                  imageUri: `${BASE_URL}/Notes_Thumbnails/${sermonnotes.notesimage}`,
                })
              }>
              <View key={sermonnotes.id}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <View style={{marginRight: 10}}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${BASE_URL}/Notes_Thumbnails/${sermonnotes.notesimage}`,
                      }}
                    />
                    <Text style={styles.sermonDate}>
                      {new Date(sermonnotes.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </Text>
                    <Text style={styles.sermonText}>
                      {sermonnotes.sermondescription.slice(0, 25)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>No Sermon Notes available</Text>
        )}
      </ScrollView>
    </View>
  );
}
