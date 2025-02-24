import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import useTheme from '../hooks/useTheme';

const CustomButton = ({
  text = 'Processing...',
  onPress,
  loading,
  type = 'primary',
  icon,
}) => {
  const { styles } = useTheme(getStyles);
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, type === 'secondary' && styles.secondaryButton]}
        onPress={onPress}
        disabled={loading}>
          {icon && <Image source={icon} style={styles.icon}/>}
          <Text style={[styles.buttonText, type === 'secondary' && styles.secondaryButtonText]}>
            {text}
          </Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  button: {
    paddingHorizontal:20,
    height:50,
    backgroundColor:'#4CAF50',
    justifyContent:'center',
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
  },
  secondaryButton: {
    backgroundColor: theme.background,
    borderWidth:1,
    borderColor: '#ccc',
  },
  buttonText: {
    color:'#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText:{
    color:theme.text,
  },
  icon:{
    width:24,
    height:24,
    marginRight:10,
  },
});

export default CustomButton;
