import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { clearUserSession } from '../utils/storage';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';

const Toolbar = ({title,showLogout = true,showDrawer = true}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogout = async() =>{
        await clearUserSession();
        dispatch(clearUser());
        navigation.replace('LoginScreen');
    };
  return (
    <View style={styles.toolbar}>
        {showDrawer ? (
            <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                <Icon name="menu" size={30} color ="#ffffff"/>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity  onPress={()=>navigation.goBack()}>
                <Icon name="arrow-left" size={30} color="#ffffff"/>
            </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>

        {showLogout ? (
            <TouchableOpacity onPress={handleLogout}>
                <Icon name="log-out" size={30} color="#ffffff"/>
            </TouchableOpacity>
        ) : (
            <View style={styles.placeholder} />
        )
        }
    </View>
  );
};

const styles = StyleSheet.create({
    toolbar:{
        height:60,
        flexDirection:'row',
        paddingHorizontal:10,
        backgroundColor:'#4CAF50',
        justifyContent:'space-between',
        alignItems:'center',
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:'#ffffff',
        flex:1,
        textAlign:'center',
    },
    placeholder:{
        width:30,
    },
});

export default Toolbar;
