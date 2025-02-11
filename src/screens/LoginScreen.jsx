import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {googleSignIn, login, resetPassword} from '../services/firebaseAuth';
import CustomDialog from '../components/CustomDialog';
import InputText from '../components/InputText';
import CustomButton from '../components/CustomButton';
import { ToastAndroid } from 'react-native';
import { setUserLoggedIn } from '../utils/storage';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalVisible, setModelVisible] = useState(false);

  const handleDialogClose = () => {
    setModelVisible(false);
    if (successMessage) {
      navigation.replace('HomeScreenDrawer');
    }
  };

  const handleLogin = async () => {
    if(!email || !password) {
      setErrorMessage('All fields are Required for Login');
      setModelVisible(true);
      return;
    }
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const {user, error} = await login(email, password);
    setLoading(false);
    if (user) {
      setSuccessMessage('Login Successful!');
      await setUserLoggedIn(true,user.email);
      setModelVisible(true);
    } else {
      setErrorMessage(error);
      setModelVisible(true);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const {user, error} = await googleSignIn();
    setLoading(false);
    if (user) {
      await setUserLoggedIn(true,user.email);
      setSuccessMessage('Google Sign-In Successful!');
      setModelVisible(true);
    } else {
      setErrorMessage(error);
      setModelVisible(true);
    }
  };

  const handleForgotPassword = async () => {
    if(!email) {
      ToastAndroid.show('Please Enter Your Email First',ToastAndroid.SHORT);
      return;
    }

    const {success, error } = await resetPassword(email);
    if(success){
      ToastAndroid.show('Resent link sent to your email', ToastAndroid.LONG);
    } else {
      ToastAndroid.show(error, ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login to Your Acccount</Text>
      <InputText
      placeholder="Enter you email"
      value={email}
      onChangeText={setEmail}
      iconName="mail"
      keyboardType="email-address"
      />
      <InputText
      placeholder="Enter your password"
      value={password}
      onChangeText={setPassword}
      iconName="lock"
      secureTextEntry={true}
      isPassword={true}/>
      <TouchableOpacity style={styles.forgetPassword} onPress={handleForgotPassword}>
        <Text style={styles.forgetPasswordText}>Forget Password?</Text>
      </TouchableOpacity>
      <CustomButton
      text={loading ? 'Loging in...' : 'Login'}
      onPress={handleLogin}
      loading={loading}
      />
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('SignUpScreen')}>
            Sign Up
          </Text>
        </Text>
      </View>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}> or</Text>
        <View style={styles.line} />
      </View>
      <CustomButton
      text="Login with Google"
      onPress={handleGoogleLogin}
      type="secondary"
      icon={require('../assets/google.png')}
      />
      <CustomDialog
        visible={modalVisible}
        title={errorMessage ? 'Oops!' : 'Congratulations!'}
        message={errorMessage || successMessage}
        type={errorMessage ? 'error' : 'success'}
        onClose={handleDialogClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#f7f8fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  forgetPassword: {
    marginBottom: 15,
  },
  forgetPasswordText: {
    fontSize: 14,
    color: '#007BFF',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#333',
  },
  signupLink: {
    color: 'red',
    marginTop: 10,
  },
  orContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:20,
    width:'100%',
  },
  line:{
    flex:1,
    height:1,
    backgroundColor:'#ccc',
  },
  orText:{
    marginHorizontal:10,
    fontSize:16,
    color:'#666',
  },
  googleButton:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:50,
    backgroundColor:'#fff',
    borderRadius:10,
    borderWidth:1,
    borderColor: '#ccc',
    marginBottom:20,
  },
  googleIcon:{
    width: 24,
    height: 24,
    marginRight:10,
  },
  googleButtonText:{
    fontSize:16,
    fontWeight:'bold',
    color:'#333',
  },
});

export default LoginScreen;
