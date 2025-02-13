import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {Image, StyleSheet, Switch, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const renderIcon =
  name =>
  ({color, size}) =>
    <Icon name={name} size={size} color={color} />;

export default function CustomDrawerContent(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const showSettingPage = () => {
    props.navigation.navigate('Settings');
    props.navigation.closeDrawer();
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
          <Text style={styles.username}>User Name</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.drawerItemsContainer} collapsable={false}>
          <View style={styles.themeToggle}>
            <Icon name="moon" size={22} color="#333" />
            <Text style={styles.drawerText}> Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
          </View>

          <DrawerItem
            label="Priority Tasks"
            icon={renderIcon('flag')}
            onPress={() => console.log('Priority clicked')}
          />
          <DrawerItem
            label="Quick Action Tasks"
            icon={renderIcon('zap')}
            onPress={() => console.log('Quick Action Clicked')}
          />
          <DrawerItem
            label="Progress Tasks"
            icon={renderIcon('bar-chart')}
            onPress={() => console.log('Progress Clicked')}
          />
          <DrawerItem
            label="Optional Tasks"
            icon={renderIcon('list')}
            onPress={() => console.log('Optional Clicked')}
          />
          <DrawerItem
            label="Settings"
            icon={renderIcon('settings')}
            onPress={showSettingPage}
          />
          <DrawerItem
            label="Logout"
            icon={renderIcon('log-out')}
            onPress={() => console.log('Logout Clicked')}
          />

          <View style={styles.divider} />

          <DrawerItem
            label="Delete Account"
            icon={renderIcon('trash-2')}
            onPress={() => console.log('Delete Clicked')}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#E3E3E3',
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
  },
  email: {
    fontSize: 14,
    color: '#555',
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
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});
