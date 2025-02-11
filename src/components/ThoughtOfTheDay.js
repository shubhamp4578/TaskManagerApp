import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { fetchThoughtOfTheDay } from '../services/api';
import { ActivityIndicator, Card } from 'react-native-paper';

const ThoughtOfTheDay = () => {
    const [thought,setThought] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getThought = async() => {
            const data = await fetchThoughtOfTheDay();
            if(data){
                setThought(data);
            }
            setLoading(false);
        };
        getThought();
    },[]);
  return (
    <View style = {styles.thoughtContainer}>
        {loading ? (
            <ActivityIndicator size="small" color="#4CAF50"/>
        ) : (thought && (
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.quoteText}>"{thought.quote}"</Text>
                    <Text style={styles.authorText}> - {thought.author}</Text>
                </Card.Content>
            </Card>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
    thoughtContainer:{
        marginTop:10,
        paddingHorizontal:16,
    },
    card:{
        backgroundColor:'#ffffff',
        padding:10,
        borderRadius:10,
        elevation:3,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        shadowRadius:4,
    },
    quoteText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign:'center',
        marginBottom:8,
    },
    authorText:{
        fontSize:14,
        fontWeight:'bold',
        textAlign:'right',
    },
});
export default ThoughtOfTheDay;
