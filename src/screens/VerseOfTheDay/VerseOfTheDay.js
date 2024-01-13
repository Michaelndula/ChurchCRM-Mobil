import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {styles} from '../../assets/css/HomeScreen';
import {getVerseOfTheDayWithImage} from '../../hooks/verseOfTheDay';

export default function VerseOfTheDay({navigation}) {
  const [verseData, setVerseData] = useState({
    verse: {citation: '', passage: ''},
    imageUrl: '',
    loading: true,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const {passage, citation, imageUrl} = await getVerseOfTheDayWithImage();
        setVerseData({
          verse: {passage, citation},
          imageUrl,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching verse:', error);
        setVerseData(prevData => ({...prevData, loading: false}));
      }
    };

    fetchAllData();

    const updateAtMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);

      const timeUntilMidnight = midnight - now;

      setTimeout(() => {
        fetchAllData();

        setInterval(() => {
          fetchAllData();
        }, 24 * 60 * 60 * 1000);
      }, timeUntilMidnight);
    };

    updateAtMidnight();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/bg.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.view}>
        {verseData.loading ? (
          <Text style={styles.loadingText}>Verse of the day loading...</Text>
        ) : (
          <>
            {verseData.verse && verseData.verse.passage ? (
              <>
                <Text style={styles.TextStyle}>{verseData.verse.passage}</Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    marginTop: 30,
                  }}>
                  {verseData.verse.citation}
                </Text>
                {verseData.imageUrl ? (
                  <Image
                    style={styles.verseImage}
                    source={{uri: verseData.imageUrl}}
                  />
                ) : null}
              </>
            ) : (
              <Text style={styles.loadingText}>
                Verse of the day not available
              </Text>
            )}
          </>
        )}
      </View>
    </ImageBackground>
  );
}