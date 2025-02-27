import {useCallback, useState} from 'react';
import {
  deleteTask,
  getTasks,
  moveTaskToCompleted,
} from '../services/firebaseStorage';
import {useFocusEffect} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, setTasks} from '../redux/tasksSlice';

const useTasks = (email, isCompleted) => {
  const dispatch = useDispatch();
  const globalTasks = useSelector(state => state.tasks.tasks);
  const globalLoading = useSelector(state => state.tasks.loading);

  const [localTasks, setLocalTasks] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!email) {
      return;
    }
    if (isCompleted) {
      setLocalLoading(true);
    } else {
      dispatch(setLoading(true));
    }
    try {
      const allTasks = await getTasks(email, isCompleted);
      const categorizedTasks = allTasks.reduce((acc, task) => {
        acc[task.category] = acc[task.category] || [];
        acc[task.category].push(task);
        return acc;
      }, {});

      const formattedTasks = Object.entries(categorizedTasks)
        .filter(([_, tasks]) => tasks.length > 0)
        .map(([title, data]) => ({title: `${title} Tasks`, data}));

      if (isCompleted) {
        setLocalTasks(formattedTasks);
      } else {
        dispatch(setTasks(formattedTasks));
      }
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    } finally {
      if (isCompleted) {
        setLocalLoading(false);
      } else {
        dispatch(setLoading(false));
      }
    }
  }, [email, isCompleted, dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks]),
  );

  const removeTask = async taskId => {
    try {
      await deleteTask(email, taskId, isCompleted);
      ToastAndroid.show('Task deleted', ToastAndroid.SHORT);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const moveToCompleted = async taskId => {
    try {
      await moveTaskToCompleted(email, taskId);
      ToastAndroid.show('Task moved to completed', ToastAndroid.SHORT);
      fetchTasks();
    } catch (error) {
      console.log('Error while moving the task: ', error);
    }
  };

  return {
    tasks: isCompleted ? localTasks : globalTasks,
    loading: isCompleted ? localLoading : globalLoading,
    fetchTasks,
    removeTask,
    moveToCompleted,
  };
};

export default useTasks;
