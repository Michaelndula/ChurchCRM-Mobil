import * as React from "react";
import {
  Image,
  Text,
  ImageBackground,
  ScrollView,
  View,
  Pressable, StatusBar
} from "react-native";

import { styles } from '../assets/css/LandingScreen';
import { useNavigation } from "@react-navigation/native";

export default function LandingScreen() {
  const navigation = useNavigation();
  const handleSignUp = () => {
    navigation.navigate("SignupScreen");
  };
  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };
  const forgotpassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={{ padding: 20 }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <ScrollView>
        <View style={styles.img_view}>
          <Image
            style={styles.img}
            source={require("../assets/images/kcc-logo.png")}
          />
        </View>
        <View style={styles.verse_view}>
          <Text style={styles.verse_text}>
            For I know the plans i have{"\n"}
            for you, declares the{"\n"}
            Lord, plans for welfare and{"\n"}
            not for evil, to give you a{"\n"}
            future and hope.
          </Text>
          <Text style={styles.verse}>Jeremiah 29:11 </Text>
        </View>
        <View style={styles.auth_btn}>
          <Pressable onPress={handleLogin} style={styles.login_btn}>
            <Text style={{ fontSize: 20, color: "white" }}>Login</Text>
          </Pressable>

          <Pressable onPress={handleSignUp} style={styles.signin_btn}>
            <Text style={{ fontSize: 20, color: "white" }}>Sign up</Text>
          </Pressable>
          <Pressable onPress={forgotpassword}>
            <Text style={styles.forgot_password}>Forgot password?</Text>

          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
