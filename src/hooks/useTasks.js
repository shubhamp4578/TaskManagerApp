import { useCallback, useState } from 'react';
import { deleteTask, getTasks, moveTaskToCompleted } from '../services/firebaseStorage';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';

const useTasks = (email,isCompleted) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = useCallback(async () => {
        if (!email) {
            return;
        }
        setLoading(true);
        try {
            const allTasks = await getTasks(email, isCompleted);
            const categorizedTasks = [
                { title: 'Priority Tasks', data: allTasks.filter(task => task.category === 'Priority') },
                { title: 'Quick Action Tasks', data: allTasks.filter(task => task.category === 'Quick Action') },
                { title: 'Progress Tasks', data: allTasks.filter(task => task.category === 'Progress') },
                { title: 'Optional Tasks', data: allTasks.filter(task => task.category === 'Optional') },
              ].filter(section => section.data.length > 0);
              setTasks(categorizedTasks);
        } catch (error) {
            console.error('Error fetching tasks: ',error);
        }finally {
            setLoading(false);
        }
    },[email,isCompleted]);


    useFocusEffect(
        useCallback(()=> {
            fetchTasks();
        },[fetchTasks])
    );

    const removeTask = async (taskId) => {
        try {
            await deleteTask(email, taskId, isCompleted);
            ToastAndroid.show('Task deleted', ToastAndroid.SHORT);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task: ',error);
        }
    };

    const moveToCompleted = async(taskId) => {
        try {
            await moveTaskToCompleted(email, taskId);
            ToastAndroid.show('Task moved to completed', ToastAndroid.SHORT);
            fetchTasks();
        } catch (error) {
            console.log('Error while moving the task: ',error);
        }
    };

    return {
        tasks,
        loading,
        fetchTasks,
        removeTask,
        moveToCompleted,
    };
};

export default useTasks;
