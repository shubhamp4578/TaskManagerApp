import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Alert,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import ThoughtOfTheDay from '../components/ThoughtOfTheDay';
import {useSelector} from 'react-redux';
import {deleteTask, getTasks} from '../services/firebaseStorage';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../components/TaskCard';
import {formatDate} from '../utils/helper';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const email = useSelector(state => state.user.email);

  const fetchTasks = useCallback(async () => {
    if (!email) {
      return;
    }
    setLoading(true);
    try {
      if (email) {
        const allTasks = await getTasks(email, true);
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
      console.error('Error fetching Tasks ', error);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThoughtOfTheDay />
        {loading ? (
          <Text> Loading Tasks...</Text>
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
                  color="#000F34"
                  onLongPress={() => handleLongPress(task)}
                />
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.noTasksText}>Currently, there is no task.</Text>
        )}
      </ScrollView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteTask}>
              <Text style={styles.deleteModalText}>Delete Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  noTasksText: {
    fontSize: 16,
    color: '#000',
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
  deleteModalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
export default CompletedTasks;
