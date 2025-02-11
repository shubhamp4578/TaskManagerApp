import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ThoughtOfTheDay from '../components/ThoughtOfTheDay';

const CompletedTasks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Completed Tasks</Text>
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
export default CompletedTasks;
