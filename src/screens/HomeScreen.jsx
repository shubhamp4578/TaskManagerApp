import {
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OnGoingTasks from './OnGoingTasks';
import CompletedTasks from './CompletedTasks';
import Toolbar from '../components/Toolbar';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Toolbar
      title="Task Manager"
      showDrawer={true}
      showLogout={true}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
          tabBarIndicatorStyle: {backgroundColor: '#4CAF50'},
          tabBarStyle: {backgroundColor: '#f5f5f5'},
        }}>
        <Tab.Screen name="OnGoing/Upcomming Tasks" component={OnGoingTasks} />
        <Tab.Screen name="Completed Tasks" component={CompletedTasks} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomeScreen;
