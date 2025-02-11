import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ThoughtOfTheDay from '../components/ThoughtOfTheDay';

const OnGoingTasks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>OnGoing/Upcoming Tasks</Text>
      <ThoughtOfTheDay/>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    },
    heading:{
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10,
    },
});
export default OnGoingTasks;
