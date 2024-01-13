import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const handleLogin = async (email, password, setUserId, navigation) => {
  const BASE_URL = 'https://39af-197-232-61-198.ngrok-free.app';
  const API_URL = `${BASE_URL}/api/login`;
  try {
    const response = await axios.post(`${API_URL}`, {
      email,
      password,
    });
    const token = response.data.token;
    const loggedId = response.data.userId;
    setUserId(loggedId);
    navigation.navigate('MainContainer');
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const handleRegister = async (
  name,
  email,
  phone,
  password,
  confirm_password,
) => {
  try {
    const response = await axios.post(
      'https://2b2c-197-232-61-232.ngrok-free.app/api/register',
      {
        name,
        email,
        phone,
        password,
        confirm_password,
      },
    );
    if (response && response.data) {
      const token = response.data.token;
      navigation.navigate('MainContainer');
    } else {
      console.error('Registration failed: No data in the response');
    }
  } catch (error) {
    console.error(
      'Registration failed:',
      error.response ? error.response.data.errors : error.message,
    );
  }
};

export const FILE_BASE = 'https://39af-197-232-61-198.ngrok-free.app';

export const HandleDataLoading = () => {
  const URL = 'https://39af-197-232-61-198.ngrok-free.app/api/';

  const generateUrl = endpoint => {
    return `${URL}${endpoint}`;
  };

  const sermonsUrl = generateUrl('fetchSermons');
  const sermonNotesUrl = generateUrl('fetchSermonnotes');
  const announcementsUrl = generateUrl('fetchAnnouncements');

  const [data, setData] = useState({
    sermons: [],
    sermonNotes: [],
    announcements: [],
    sermonsLoading: true,
    sermonNotesLoading: true,
    announcementsLoading: true,
    loading: true,
  });

  useEffect(() => {
    const fetchData = (URL, key, setLoading) => {
      fetch(URL)
        .then(response => response.json())
        .then(json => {
          setData(prevData => ({...prevData, [key]: json}));
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error fetching data from ${URL}:`, error);
          setLoading(false);
        });
    };

    const fetchAllData = async () => {
      fetchData(sermonsUrl, 'sermons', setData);
      fetchData(sermonNotesUrl, 'sermonNotes', setData);
      fetchData(announcementsUrl, 'announcements', setData);
    };

    fetchAllData();
  }, []);

  return {data};
};
