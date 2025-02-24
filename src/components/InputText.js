// components/InputText.js
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import useTheme from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/Feather';

const InputText = ({
  placeholder,
  value,
  onChangeText,
  iconName,
  keyboardType = 'default',
  secureTextEntry = false,
  isPassword = false,
}) => {
  const {theme, styles} = useTheme(getStyles);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={24} color="#808080" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={theme.placeHolderTextColor}
        onChangeText={onChangeText}
        secureTextEntry={isPassword ? !showPassword : secureTextEntry}
        keyboardType={keyboardType}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="#808080"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
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
      backgroundColor: theme.backgroundColor,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
    },
  });

export default InputText;
