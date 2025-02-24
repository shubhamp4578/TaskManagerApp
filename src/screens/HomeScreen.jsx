import {
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OnGoingTasks from './OnGoingTasks';
import CompletedTasks from './CompletedTasks';
import Toolbar from '../components/Toolbar';
import useTheme from '../hooks/useTheme';

const Tab = createMaterialTopTabNavigator();
const HomeScreen = () => {
  const {theme, styles} = useTheme(getStyles);
  return (
    <View style={styles.container}>
      <Toolbar
      title="Task Manager"
      showDrawer={true}
      showLogout={true}
      />
      <View style={styles.navigationView}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold',color:theme.text},
          tabBarIndicatorStyle: {backgroundColor: '#4CAF50'},
          tabBarStyle: {backgroundColor:theme.background },
        }}>
        <Tab.Screen name="OnGoing/Upcomming Tasks" component={OnGoingTasks} options={{}}/>
        <Tab.Screen name="Completed Tasks" component={CompletedTasks} />
      </Tab.Navigator>
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.background,
  },
  navigationView: {
    flex:1,
  },
});

export default HomeScreen;
