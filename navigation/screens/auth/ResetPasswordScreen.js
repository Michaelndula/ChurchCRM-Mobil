import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import axios from 'axios';

const ResetPasswordScreen = ({ route, navigation }) => {
  const { email, token } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPassword = async () => {
    try {
      const response = await axios.post('https://f108-41-90-188-153.ngrok-free.app/api/reset-password', {
        email: email,
        token: token,
        password: password,
        password_confirmation: confirmPassword,
      });

      // Handle the response, show a success message, or navigate to the login screen
      console.log(response.data.message);
      navigation.navigate('LoginScreen'); // Change 'Login' to the name of your login screen
    } catch (error) {
      // Handle error, show an error message, etc.
      console.error(error.response.data.message);
    }
  };

  return (
    <View>
      <Text>Enter your new password</Text>
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Pressable onPress={resetPassword}>
        <Text>Resetr Password</Text>
      </Pressable>
    </View>
  );
};

export default ResetPasswordScreen;
