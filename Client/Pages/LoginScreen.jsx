import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from '../Components/UI/Button';
import { MainContext } from '../Components/Context/MainContextProvider';

const Login = ({ navigation }) => {

  useContext
  const { authenticated, setAuthenticated } = useContext(MainContext);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (event) => {
    setPassword(event);
  };
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('https://time-loop-nodejs.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login
        console.log(data.message); // or perform any other actions
        setAuthenticated(true);
      } else {
        const data = await response.json();
        // Handle login error
        console.log(data.message); // or display an error message to the user
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error logging in:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome Back ! 👋</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Enter your email address'
              placeholderTextColor={COLORS.black}
              onChangeText={handleEmailChange}
              keyboardType='email-address'
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              onChangeText={handlePasswordChange}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={styles.passwordVisibilityIcon}
            >
              {isPasswordShown ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>

        <Button
          onPress={() => handleLogin(email, password)}
          title="Login"
          filled
          style={styles.button}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or Login with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={styles.socialLoginButton}
          >
            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={styles.socialLoginButton}
          >
            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  inputWrapper: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 22,
  },
  input: {
    flex: 1,
  },
  passwordVisibilityIcon: {
    position: 'absolute',
    right: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grey,
    marginHorizontal: 10,
  },
  dividerText: {
    fontSize: 14,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialLoginButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginRight: 4,
    borderRadius: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 22,
  },
  registerText: {
    fontSize: 16,
    color: COLORS.black,
  },
  registerLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
});

export default Login;
