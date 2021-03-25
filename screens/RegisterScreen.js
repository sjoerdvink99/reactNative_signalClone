import React, { useState, useLayoutEffect } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full Name'
          autoFocus
          type='text'
          value={name}
          onChange={(text) => setName(text)}
        />
        <Input
          placeholder='Email'
          type='email'
          value={email}
          onChange={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          type='password'
          secureTextEntry
          value={password}
          onChange={(text) => setPassword(text)}
        />
        <Input
          placeholder='Image Url'
          type='text'
          value={imageUrl}
          onChange={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title='Register'
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
