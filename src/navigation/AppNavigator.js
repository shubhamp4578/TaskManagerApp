import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUp from '../screens/SignUp';
import {isUserFirstTime, isUserLoggedIn} from '../utils/storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../navigation/CustomDrawerContent';
import AddTasks from '../screens/AddTasks';
import Settings from '../screens/Settings';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const renderDrawerContent = (props) => <CustomDrawerContent {...props} />;


const DrawerNavigator = () => {
  return(
  <Drawer.Navigator
  drawerContent={renderDrawerContent}
  screenOptions={{headerShown:false}}>
    <Drawer.Screen name="HomeScreen" component={HomeScreen}/>
  </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const [firstTime, loggedIn] = await Promise.all([isUserFirstTime(), isUserLoggedIn()]);
        if (firstTime) {
          setInitialRoute('IntroScreen');
        } else if (loggedIn) {
          setInitialRoute('HomeScreenDrawer');
        } else {
          setInitialRoute('LoginScreen');
        }
      } catch (error) {
        setInitialRoute('LoginScreen');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  if(isLoading) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreenDrawer" component={DrawerNavigator} />
        <Stack.Screen name="SignUpScreen" component={SignUp} />
        <Stack.Screen name="AddTasks" component={AddTasks} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
