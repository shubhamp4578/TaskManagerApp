import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ThoughtOfTheDay from '../components/ThoughtOfTheDay';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../components/TaskCard';
import {formatDate} from '../utils/helper';
import useTheme from '../hooks/useTheme';
import useTasks from '../hooks/useTasks';
import TaskModal from '../components/TaskModal';

const CompletedTasks = () => {
  const email = useSelector(state => state.user.email);
  const categoryColors = useSelector(state=> state.categoryColors);
  const {styles} = useTheme(getStyles);
  const {tasks, loading, removeTask} = useTasks(email,true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
              await removeTask(selectedTask.id);
              ToastAndroid.show(
                'Task Deleted successfully',
                ToastAndroid.SHORT,
              );
              setIsModalVisible(false);
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
                  color={categoryColors[task.category] || '#FD0362'}
                  onLongPress={() => handleLongPress(task)}
                />
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.noTasksText}>Currently, there is no task.</Text>
        )}
      </ScrollView>

      <TaskModal
      isVisible={isModalVisible}
      onClose={()=> setIsModalVisible(false)}
      onDelete={handleDeleteTask}
      isCompleted={true}
      />
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.background,
  },
  scrollContainer: {
    paddingBottom: 100,
    paddingHorizontal: 20,
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
    backgroundColor:theme.background,
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
