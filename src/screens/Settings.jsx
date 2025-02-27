import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toolbar from '../components/Toolbar';
import useTheme from '../hooks/useTheme';
import {Dropdown} from 'react-native-element-dropdown';
import CustomDialog from '../components/CustomDialog';
import ColorPicker from 'react-native-wheel-color-picker';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategoryColors, saveCategoryColor} from '../redux/categoryColorSlice';

const categories = [
  {label: 'Priority', value: 'Priority'},
  {label: 'Optional', value: 'Optional'},
  {label: 'Quick Action', value: 'Quick Action'},
  {label: 'Progress', value: 'Progress'},
];
const Settings = () => {
  const dispatch = useDispatch();
  const categoryColors = useSelector(state => state.categoryColors);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [modalVisible, setModalVisible] = useState(false);

  const {styles} = useTheme(getStyles);

  useEffect(() => {
    dispatch(fetchCategoryColors());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }
    setSelectedColor(categoryColors[selectedCategory] || '#FF0000');
  }, [selectedCategory, categoryColors]);

  const saveColor = async () => {
    if (!selectedCategory) {
      ToastAndroid.show('Please select a category first!', ToastAndroid.SHORT);
      return;
    }
    dispatch(saveCategoryColor(selectedCategory, selectedColor));
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <Toolbar title="Settings" showDrawer={false} showLogout={false} />
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Choose Category: </Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.containerStyle}
          data={categories}
          labelField="label"
          valueField="value"
          placeholder="Select a category..."
          value={selectedCategory}
          onChange={item => setSelectedCategory(item.value)}
        />

        {selectedCategory && (
          <View style={styles.pickerWrapper}>
            <Text style={styles.header}>Pick a Color:</Text>
            <View style={styles.pickerContainer}>
              <ColorPicker
                color={selectedColor}
                onColorChangeComplete={color => setSelectedColor(color)}
                sliderHidden="true"
                thumbSize={25}
              />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={saveColor}>
              <Text style={styles.submitButtonText}>Save Color</Text>
            </TouchableOpacity>
          </View>
        )}
        <CustomDialog
          visible={modalVisible}
          title="Success"
          message={`Color saved for ${selectedCategory}!`}
          type="success"
          onClose={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      flexGrow: 1,
      padding: 20,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      marginTop: 20,
    },
    dropdown: {
      marginBottom: 10,
      borderColor: 'gray',
      height: 50,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    pickerWrapper: {
      marginTop: 20,
      flexDirection: 'column',
    },
    pickerContainer: {
      alignItems: 'center',
      marginBottom: 20,
      width: '100%',
      height: 300,
    },
    submitButton: {
      backgroundColor: '#007BFF',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
      width: '100%',
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    colorPicker: {
      height: 200,
      width: 200,
    },
  });

export default Settings;
