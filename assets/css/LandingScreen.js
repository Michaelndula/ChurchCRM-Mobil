import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    img_view: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      img: {
        width: 150,
        height: 150,
        resizeMode: "contain",
      },
      verse_view: {
        paddingTop: 80,
        paddingBottom: 80,
        width: "80%",
        alignItems: "center",
      },
      verse_text: {
        fontSize: 20,
        fontFamily: "sans-serif",
        marginBottom: 20,
      },
      verse: {
        fontFamily: "sans-serif",
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "900",
      },
      auth_btn: {
        alignItems: "center",
      },
      login_btn: {
        paddingVertical: 10,
        backgroundColor: "#48A6F9",
        borderRadius: 20,
        width: "80%",
        height: 40,
        elevation: 5,
        alignItems: "center",
        justifyContent: "flex-end",
      },
  
      signin_btn: {
        paddingVertical: 10,
        borderRadius: 20,
        width: "80%",
        height: "auto",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        borderWidth: 3,
        borderColor: "white",
        backgroundColor: 'lightblue',
        marginTop: 30,
        borderRadius: 30,
      },
  
      forgot_password: {
        fontSize: 18,
        marginTop: 30,
        fontWeight: "900",
      },



});
export  {styles};