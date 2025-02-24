import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TaskCard = ({title, description, startDate, endDate, priority, color, onLongPress}) => {
    return (
        <TouchableOpacity onLongPress={onLongPress} activeOpacity={0.7}>
            <View style={[styles.card, {backgroundColor: color}]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.date}>Start Date: {startDate}</Text>
                <Text style={styles.date}>End Date: {endDate}</Text>
                <Text style={styles.priority}>{priority}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card:{
        padding:15,
        borderRadius:10,
        marginVertical:8,
        elevation:3,
        shadowColor:'#333',
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.2,
        shadowRadius:3,
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
    },
    description:{
        fontSize:14,
        color:'#fff',
        marginVertical:5,
    },
    date:{
        fontSize:12,
        color:'#f0f0f0',
    },
    priority:{
        fontSize:14,
        fontWeight:'bold',
        color:'#FFD700',
        marginTop:5,
    },
});

export default TaskCard;
