import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toolbar from '../components/Toolbar';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import TaskCard from '../components/TaskCard';
import {formatDate} from '../utils/helper';
import useTheme from '../hooks/useTheme';

const TaskDetailScreen = () => {
  const route = useRoute();
  const {title} = route.params || {};

  const {styles} = useTheme(getStyles);

  const tasks = useSelector(state => state.tasks.tasks);
  const categoryColors = useSelector(state => state.categoryColors);


  const filteredTasks =
    tasks.find(taskGroup => taskGroup.title === title)?.data || [];


  return (
    <View style={styles.container}>
      <Toolbar
        title={title || 'Task Detail'}
        showDrawer={false}
        showLogout={false}
      />

      <ScrollView contentContainerStyle={styles.scrollCOntainer}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              startDate={formatDate(task.startDate)}
              endDate={formatDate(task.endDate)}
              priority={task.category}
              color={categoryColors[task.category] || '#FD0362'}
              onLongPress={() => console.log('Long Press clicked')}
            />
          ))
        ) : (
          <Text style={styles.noTasksText}>No Task found </Text>
        )}
      </ScrollView>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.background,
  },
  scrollCOntainer: {
    padding: 20,
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: theme.text,
  },
});
export default TaskDetailScreen;
