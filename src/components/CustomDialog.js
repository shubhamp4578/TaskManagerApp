import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomDialog = ({visible,title, message,type, onClose}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.modalContainer}>
            <View style={[styles.modalContent, type === 'error' ? styles.errorBackground : styles.successBackground]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={[styles.message, type === 'error' ? styles.errorText : styles.successText]}>
                    {message}
                </Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Okay</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);
};


const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    modalContent:{
        width:'80%',
        backgroundColor:'white',
        padding:20,
        borderRadius:10,
        alignItems:'center',
    },
    successBackground:{
        backgroundColor:'#D4EDDA',
    },
    errorBackground:{
        backgroundColor:'#FFFFFF',
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10,
        color:'#333',
    },
    message:{
        fontSize:16,
        textAlign:'center',
        marginBottom:10,
    },
    errorText:{
        color:'red',
    },
    successText:{
        color:'green',
    },
    closeButton:{
        backgroundColor:'#007BFF',
        padding:10,
        borderRadius:5,
    },
    closeButtonText:{
        color:'#fff',
        fontSize:16,
    },
});
export default CustomDialog;
