import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import ThoughtOfTheDay from '../components/ThoughtOfTheDay';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useSelector} from 'react-redux';
import {formatDate} from '../utils/helper';
import useTheme from '../hooks/useTheme';
import useTasks from '../hooks/useTasks';
import TaskModal from '../components/TaskModal';

const OnGoingTasks = () => {
  const navigation = useNavigation();
  const email = useSelector(state => state.user.email);
  const {styles} = useTheme(getStyles);
  const {tasks, loading, removeTask, moveToCompleted} = useTasks(email, false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addTask = () => {
    navigation.navigate('AddTasks');
  };

  const handleLongPress = task => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleDeleteTask = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setIsModalVisible(false),
        },
        {
          text: 'Yes',
          onPress: async () => {
            if(selectedTask) {
              await removeTask(selectedTask.id);
              setIsModalVisible(false);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleMoveToCompleted = async () => {
    if(selectedTask){
    await moveToCompleted(selectedTask.id);
    ToastAndroid.show('Task marked as completed', ToastAndroid.SHORT);
    setIsModalVisible(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThoughtOfTheDay />

        {loading ? (
          <Text>Loading tasks...</Text>
        ) : tasks.length > 0 ? (
          tasks.map((section, index) => (
            <View key={index} style={styles.taskSection}>
              <Text style={styles.categoryTitle}>{section.title}</Text>
              {section.data.map(task => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  startDate={formatDate(task.startDate)}
                  endDate={formatDate(task.endDate)}
                  priority={task.category}
                  color="#FD0362"
                  onLongPress={() => handleLongPress(task)}
                />
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.noTasksText}>Currently, there is no task.</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={addTask}
        accessibilityLabel="Add a new task">
        <Icon name="plus" size={28} color="#fff" />
      </TouchableOpacity>
        <TaskModal
        isVisible={isModalVisible}
        onClose={()=> setIsModalVisible(false)}
        onDelete={handleDeleteTask}
        onComplete={handleMoveToCompleted}
        isCompleted={false}
        />
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      paddingBottom: 100,
      paddingHorizontal: 20,
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
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      color: theme.text,
    },
    noTasksText: {
      fontSize: 16,
      color: theme.text,
      textAlign: 'center',
      marginTop: 20,
    },
  });

export default OnGoingTasks;
