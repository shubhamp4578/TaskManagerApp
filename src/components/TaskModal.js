import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TaskModal = ({isVisible, onClose, onDelete, onComplete, isCompleted}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Modal transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {!isCompleted && (
            <TouchableOpacity style={styles.button} onPress={onComplete}>
              <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={onDelete}>
            <Text style={styles.buttonText}>Delete Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    overlay: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: ' rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor:'#fff',
        borderRadius: 10,
    },
    button: {
        padding:15,
        backgroundColor:'#2196F3',
        borderRadius:5,
        marginBottom: 10,
        alignItems:'center',
    },
    deleteButton: {
        backgroundColor:'#FF3B30',
    },
    buttonText: {
        color:'#fff',
        fontWeight:'bold',
    },
    cancelButton: {
        marginTop: 10,
        alignItems:'center',
    },
    cancelText: {
        color:'#555',
    },
});

export default TaskModal;

