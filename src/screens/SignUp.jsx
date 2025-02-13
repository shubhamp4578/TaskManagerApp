import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {deleteCurrentUser, signUp} from '../services/firebaseAuth';
import InputText from '../components/InputText';
import CustomButton from '../components/CustomButton';
import CustomDialog from '../components/CustomDialog';
import { setUser } from '../services/firebaseStorage';

const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleDialogClose = () => {
    setModalVisible(false);
    if (successMessage) {
      navigation.replace('LoginScreen');
    }
  };

  const handleSignUp = async () => {
    if (
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage('All fields are requried!');
      setModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password do not match!');
      setModalVisible(true);
      return;
    }
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const {user, error} = await signUp(email, password);
    setLoading(false);

    if (user) {
      console.log('got the user details');
      const userName = `${firstName} ${lastName}`;
      const isUserSaved = await setUser(email, userName);
      if(isUserSaved) {
        setSuccessMessage('Account created successfully!');
        setModalVisible(true);
      } else {
          await deleteCurrentUser();
          setErrorMessage('Account creation failed. Please try again');
          setModalVisible(true);
      }
    } else {
      setErrorMessage(error);
      setModalVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>

      <InputText
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        iconName="user"
      />
      <InputText
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        iconName="user"
      />
      <InputText
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        iconName="phone"
        keyboardType="phone-pad"
      />
      <InputText
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        iconName="mail"
        keyboardType="email-address"
      />
      <InputText
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        iconName="lock"
        secureTextEntry={true}
        isPassword={true}
      />
      <InputText
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        iconName="lock"
        secureTextEntry={true}
        isPassword={true}
      />

      <CustomButton
      text={loading ? 'Signing up...' : 'Sign Up'}
      onPress={handleSignUp}
      loading={loading}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>

      <CustomDialog
        visible={modalVisible}
        title={errorMessage ? 'Oops!' : 'Congratulations'}
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
    marginBottom: 30,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#333',
  },
  loginLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default SignUp;
