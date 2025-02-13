import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import ThoughtOfTheDay from '../components/ThoughtOfTheDay';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnGoingTasks = () => {
  const navigation = useNavigation();

  const handleAddTask = () => {
    console.log('Add button clicked');
    navigation.navigate('AddTasks');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThoughtOfTheDay />

        <TaskCard
          title="Complete UI Design"
          description="Finish the task manager UI before Friday"
          startDate="Feb 12, 2025"
          endDate="Feb 14, 2025"
          priority="Priority"
          color="#ff5733"
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddTask}
        accessibilityLabel="Add a new task"
      >
        <Icon name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    paddingBottom: 100,
    },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default OnGoingTasks;
