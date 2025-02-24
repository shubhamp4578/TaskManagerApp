import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
  ToastAndroid,
  Modal,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import ThoughtOfTheDay from '../components/ThoughtOfTheDay';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  deleteTask,
  getTasks,
  moveTaskToCompleted,
} from '../services/firebaseStorage';
import {useSelector} from 'react-redux';
import {formatDate} from '../utils/helper';
import useTheme from '../hooks/useTheme';

const OnGoingTasks = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const email = useSelector(state => state.user.email);
  const {styles} = useTheme(getStyles);

  const addTask = () => {
    navigation.navigate('AddTasks');
  };
  const fetchTasks = useCallback(async () => {
    if (!email) {
      return;
    }
    setLoading(true);
    try {
      if (email) {
        const allTasks = await getTasks(email, false);
        const categorizedTasks = [
          {
            title: 'Priority Tasks',
            data: allTasks.filter(task => task.category === 'Priority'),
          },
          {
            title: 'Quick Action Tasks',
            data: allTasks.filter(task => task.category === 'Quick Action'),
          },
          {
            title: 'Progress Tasks',
            data: allTasks.filter(task => task.category === 'Progress'),
          },
          {
            title: 'Optional Tasks',
            data: allTasks.filter(task => task.category === 'Optional'),
          },
        ].filter(section => section.data.length > 0);
        setTasks(categorizedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks]),
  );
  const handleLongPress = task => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };
  const handleUpdateTask = () => {
    console.log('Update task is clicked');
    setIsModalVisible(false);
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
            try {
              await deleteTask(email, selectedTask.id, false);
              ToastAndroid.show(
                'Task Deleted successfully',
                ToastAndroid.SHORT,
              );
              setIsModalVisible(false);
              await fetchTasks();
            } catch (error) {
              console.error('Error deleting task: ', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const moveToCompleted = async () => {
    await moveTaskToCompleted(email, selectedTask.id);
    ToastAndroid.show('Task marked as completed', ToastAndroid.SHORT);
    setIsModalVisible(false);
    await fetchTasks();
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

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleUpdateTask}>
              <Text style={styles.modalText}>Update Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={moveToCompleted}>
              <Text style={styles.modalText}>Move to Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteTask}>
              <Text style={styles.deleteButtonText}>Delete Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: 300,
      alignItems: 'center',
    },
    modalButton: {
      padding: 15,
      width: '100%',
      alignItems: 'center',
    },
    deleteButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'red',
    },
    modalText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default OnGoingTasks;
