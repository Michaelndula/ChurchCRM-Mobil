import React, { useState } from "react";
import axios from "axios";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  View,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import {styles } from '../../../assets/css/Login';
export default function LoginScreen( {setUserId}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigation = useNavigation();
  
  const Resetpassword = () => {
    navigation.navigate("ResetPasswordScreen");
  };

  //Auth functionality
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://3829-197-232-61-194.ngrok-free.app/api/login", {
        email,
        password,
      });
      console.log(email);
      const token = response.data.token;
      const loggedId = response.data.userId;
      console.log(loggedId)
      setUserId(loggedId);
      navigation.navigate("MainContainer");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  //end auth functionality


  return (
    <View style={{ padding: 20 }}>
      <ScrollView>
        <View style={styles.img_view}>
          <Image
            style={styles.img}
            source={require("../../../assets/images/kcc-logo.png")}
          />
        </View>

        <View style={styles.login_view}>
          <SafeAreaView style={styles.login_form}>
            <Text style={styles.login_text}>Enter Email & Password</Text>
            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}
              >
                <Icon
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={20}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <Pressable
              onPress={handleLogin}
              style={{
                paddingVertical: 10,
                width: "100%",
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightblue",
                marginTop: 30,
                borderRadius: 30,
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Login</Text>
            </Pressable>
            <Text
              style={{
                color: "blue",
                fontWeight: "900",
                fontSize: 18,
                alignSelf: "center",
                marginTop: 30,
              }}
            >
              Forgot password?
            </Text>
            <Text onPress={Resetpassword}>Reset Password</Text>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
}
