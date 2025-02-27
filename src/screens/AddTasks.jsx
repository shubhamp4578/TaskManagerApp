import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Toolbar from '../components/Toolbar';
import InputText from '../components/InputText';
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../components/CustomButton';
import CustomDialog from '../components/CustomDialog';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addTask, updateTask} from '../services/firebaseStorage';
import { useSelector } from 'react-redux';
import useTheme from '../hooks/useTheme';

const AddTasks = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {theme,styles} = useTheme(getStyles);
  const {email} = useSelector(state=> state.user);

  const taskToEdit = route.params?.selectedTask || null;
  console.log(taskToEdit);

  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [category, setCategory] = useState(taskToEdit?.category || '');
  const [startDate, setStartDate] = useState(
    taskToEdit?.startDate ? new Date(taskToEdit?.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    taskToEdit?.startDate ? new Date(taskToEdit?.endDate) : new Date()
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success');


  const categories = ['Priority', 'Quick Action', 'Progress', 'Optional'];

  const handleTask = async () => {
    if (!title || !description) {
      setDialogMessage('Title and Description are required!');
      setDialogType('error');
      setDialogVisible(true);
      return;
    }
    const taskData = {
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      category,
      createdAt: new Date().toISOString(),
    };
    let isTaskDone;
    if(taskToEdit) {
        isTaskDone = await updateTask(email,taskToEdit.id,taskData);
    } else {
    isTaskDone = await addTask(email, taskData);
    }
    if (taskToEdit) {
      setDialogMessage(isTaskDone ? 'Task updated successfully!' : 'Failed to update task.');
    } else {
      setDialogMessage(isTaskDone ? 'Task created successfully!' : 'Failed to create task.');
    }

    setDialogType(isTaskDone ? 'success' : 'error');
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    if (dialogType === 'success') {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <Toolbar title="Add Task" showDrawer={false} showLogout={false} />
      <View style={styles.formContainer}>
        <InputText
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
          iconName="edit-3"
        />

        <TextInput
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          style={styles.descriptionInput}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholderTextColor={theme.text}
        />

        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowStartDatePicker(true)}>
          <Icon name="calendar" size={24} color="#808080" />
          <Text style={styles.dateText}>
            Start Date : {startDate.toDateString()}
          </Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, date) => {
              setShowStartDatePicker(false);
              if (date) {
                setStartDate(date);
              }
            }}
          />
        )}
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowEndDatePicker(true)}>
          <Icon name="calendar" size={24} color="#808080" />
          <Text style={styles.dateText}>
            End Date : {endDate.toDateString()}
          </Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            onChange={(event, date) => {
              setShowEndDatePicker(false);
              if (date) {
                setEndDate(date);
              }
            }}
          />
        )}

        <Text style={styles.radioTitle}>Select Category of Task</Text>
        {categories.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.radioButton}
            onPress={() => setCategory(item)}>
            <View style={styles.radioCircle}>
              {category === item && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioText}>{item}</Text>
          </TouchableOpacity>
        ))}
        <CustomButton text={taskToEdit ? 'Update Task' : 'Create Task'} onPress={handleTask} />

        <CustomDialog
          visible={dialogVisible}
          title={dialogType === 'error' ? 'Error' : 'Success'}
          message={dialogMessage}
          type={dialogType}
          onClose={handleDialogClose}
        />
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  formContainer: {
    padding: 20,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: theme.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10,
    color: theme.text,
  },
  descriptionInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: theme.background,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color:theme.text,
  },
  radioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.text,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 5,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
    color: theme.text,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007BFF',
  },
});

export default AddTasks;
