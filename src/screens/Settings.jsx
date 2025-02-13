import { View, Text } from 'react-native';
import React from 'react';
import Toolbar from '../components/Toolbar';

const Settings = () => {
  return (
    <View>
      <Toolbar
      title="Settings"
      showDrawer = {false}
      showLogout = {false}
      />
    </View>
  );
};

export default Settings;
