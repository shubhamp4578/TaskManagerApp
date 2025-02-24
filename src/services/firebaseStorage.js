import {initializeApp} from '@react-native-firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';

const firebaseapp = initializeApp({});
const db = getFirestore(firebaseapp);

export const setUser = async (email, userName) => {
  try {
    const userRef = doc(db, 'TaskManager', email);
    await setDoc(userRef, {userName, email});
    return true;
  } catch (error) {
    console.error('Error while setting user data:- ', error);
    return false;
  }
};

export const getUser = async email => {
  try {
    const userRef = doc(db, 'TaskManager', email);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists) {
      console.log("User Data:'", userSnap.data());
      return userSnap.data();
    } else {
      console.log('User Not Found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const addTask = async (email, taskData, isCompleted = false) => {
  try {
    const taskType = isCompleted ? 'CompletedTasks' : 'OnGoingTasks';
    const tasksCollection = collection(db, 'TaskManager', email, taskType);
    await addDoc(tasksCollection, taskData);
    return true;
  } catch (error) {
    console.error('Error adding task: ', error);
    return false;
  }
};
export const getTasks = async (email, isCompleted = false) => {
  try {
    const taskType = isCompleted ? 'CompletedTasks' : 'OnGoingTasks';
    const tasksCollection = collection(
      db,
      'TaskManager',
      email,
      taskType,
    );
    const querySnapshot = await getDocs(tasksCollection);
    const tasks = querySnapshot.docs.map(value => ({
      id: value.id,
      ...value.data(),
    }));
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks: ', error);
    return [];
  }
};

export const updateTask = async (
  email,
  taskId,
  updatedData,
  isCompleted = false,
) => {
  try {
    const taskType = isCompleted ? 'CompletedTasks' : 'OnGoingTasks';
    const taskRef = doc(db, 'TaskManager', email, taskType, taskId);
    await updateDoc(taskRef, updatedData);
    console.log('Task Updated successfully!');
  } catch (error) {
    console.error('Error updating task: ', error);
  }
};

export const deleteTask = async (email, taskId, isCompleted = false) => {
  try {
    const taskType = isCompleted ? 'CompletedTasks' : 'OnGoingTasks';
    const taskRef = doc(db, 'TaskManager', email, taskType, taskId);
    await deleteDoc(taskRef);
    console.log('Task Deleted successfully!');
  } catch (error) {
    console.error('Error deleting task: ', error);
  }
};

export const moveTaskToCompleted = async (email, taskId) => {
  try {
    const taskRef = doc(db, 'TaskManager', email, 'OnGoingTasks', taskId);
    const taskSnap = await getDoc(taskRef);
    if (taskSnap.exists) {
      const taskData = taskSnap.data();
      await addDoc(
        collection(db, 'TaskManager', email, 'CompletedTasks'),
        taskData,
      );
      await deleteDoc(taskRef);
      console.log('Task moved to completed successfully');
    } else {
      console.log('Task not found');
    }
  } catch (error) {
    console.error('Error moving task: ', error);
  }
};

export const deleteUser = async email => {
  try {
    const userRef = doc(db, 'TaskManager', email);
    const ongoingTaskCollection = collection(
      db,
      'TaskManager',
      email,
      'OnGoingTasks',
    );
    const ongoingTasksSnapshot = await getDocs(ongoingTaskCollection);
    ongoingTasksSnapshot.forEach(async task => await deleteDoc(task.ref));

    const completedTaskCollection = collection(
      db,
      'TaskManager',
      email,
      'CompletedTasks',
    );
    const completedTasksSnapshot = await getDocs(completedTaskCollection);
    completedTasksSnapshot.forEach(async task => await deleteDoc(task.ref));

    await deleteDoc(userRef);
    console.log('User Deleted succcessfully');
  } catch (error) {
    console.error('Error deleting user: ', error);
  }
};
