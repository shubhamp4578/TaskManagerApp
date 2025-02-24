import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Switch, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {getUserEmail} from '../utils/storage';
import {getUser} from '../services/firebaseStorage';
import {setUser} from '../redux/userSlice';
import useTheme from '../hooks/useTheme';
import {setThemeMode} from '../redux/themeSlice';

const renderIcon =
  (name,theme) =>
  ({ size}) =>
    <Icon name={name} size={size} color={theme.text} />;

export default function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const showSettingPage = () => {
    props.navigation.navigate('Settings');
    props.navigation.closeDrawer();
  };
  const {username, email} = useSelector(state => state.user);
  const {theme,styles} = useTheme(getStyles);
  const {themeMode} = useSelector(state => state.theme);
  const isDarkMode = themeMode === 'dark';


  useEffect(() => {
    const fetchUserData = async () => {
      const storedEmail = email || (await getUserEmail());
      if (storedEmail) {
        const userData = await getUser(storedEmail);
        if (userData) {
          dispatch(setUser({username: userData.userName, email: storedEmail}));
        }
      }
    };
    if (!username || !email) {
      fetchUserData();
    }
  }, [username, email, dispatch]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    dispatch(setThemeMode(newTheme));
  };
  return (
    <View style={styles.container} collapsable={false}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}>
        <View style={styles.profileContainer} collapsable={false}>
          <Image
            source={require('../assets/avtar.jpeg')}
            style={styles.profilePic}
          />
          <Text style={styles.username}>{username || 'Guest'}</Text>
          <Text style={styles.email}>{email || 'user@example.com'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.drawerItemsContainer} collapsable={false}>
          <View style={styles.themeToggle}>
            <Icon name="moon" size={22} color={theme.text} />
            <Text style={styles.drawerText}> Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>

          <DrawerItem
            label="Priority Tasks"
            icon={renderIcon('flag',theme)}
            onPress={() => console.log('Priority clicked')}
            labelStyle={styles.itemText}
          />
          <DrawerItem
            label="Quick Action Tasks"
            icon={renderIcon('zap',theme)}
            onPress={() => console.log('Quick Action Clicked')}
            labelStyle={styles.itemText}
          />
          <DrawerItem
            label="Progress Tasks"
            icon={renderIcon('bar-chart',theme)}
            onPress={() => console.log('Progress Clicked')}
            labelStyle={styles.itemText}
          />
          <DrawerItem
            label="Optional Tasks"
            icon={renderIcon('list',theme)}
            onPress={() => console.log('Optional Clicked')}
            labelStyle={styles.itemText}
          />
          <DrawerItem
            label="Settings"
            icon={renderIcon('settings',theme)}
            onPress={showSettingPage}
            labelStyle={styles.itemText}
          />
          <DrawerItem
            label="Logout"
            icon={renderIcon('log-out',theme)}
            onPress={() => console.log('Logout Clicked')}
            labelStyle={styles.itemText}
          />

          <View style={styles.divider} />

          <DrawerItem
            label="Delete Account"
            icon={renderIcon('trash-2',theme)}
            onPress={() => console.log('Delete Clicked')}
            labelStyle={styles.deleteAccountText}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:theme.background,
    },
    profileContainer: {
      alignItems: 'center',
      paddingVertical: 30,
      backgroundColor: theme.profileBackground,
    },
    profilePic: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    email: {
      fontSize: 14,
      color: theme.lightTextColor,
    },
    drawerItemsContainer: {
      flex: 1,
      paddingVertical: 10,
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 15,
    },
    drawerText: {
      fontSize: 16,
      flex: 1,
      marginLeft: 10,
      color:theme.text,
    },
    divider: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 10,
    },
    itemText:{
      color:theme.text,
    },
    deleteAccountText: {
      color:'#f70207',
    },
  });
