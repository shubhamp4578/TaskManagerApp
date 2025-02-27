import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomDialog = ({
  visible,
  title,
  message,
  type = 'normal',
  onClose,
  showTwoOptions = false,
  onPrimaryPress,
  onSecondaryPress,
  primaryText = 'Yes',
  secondaryText = 'No',
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            type === 'error'
              ? styles.errorBackground
              : type === 'success'
              ? styles.successBackground
              : styles.normalBackground,
          ]}
        >
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={[styles.buttonContainer, showTwoOptions && styles.twoButtonContainer]}>
            {showTwoOptions ? (
              <>
                <TouchableOpacity onPress={onPrimaryPress} style={[styles.button, styles.primaryButton]}>
                  <Text style={styles.buttonText}>{primaryText}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onSecondaryPress} style={[styles.button, styles.secondaryButton]}>
                  <Text style={styles.buttonText}>{secondaryText}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={onClose} style={[styles.button, styles.defaultButton]}>
                <Text style={styles.buttonText}>Okay</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successBackground: {
    backgroundColor: '#D4EDDA',
  },
  errorBackground: {
    backgroundColor: '#F8D7DA',
  },
  normalBackground: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  twoButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#28A745',
    marginRight: 5,
    minWidth:100,
  },
  secondaryButton: {
    backgroundColor: '#DC3545',
    marginLeft: 5,
    minWidth:100,
  },
  defaultButton: {
    backgroundColor: '#007BFF',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomDialog;
