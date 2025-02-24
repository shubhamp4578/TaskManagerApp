import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { fetchThoughtOfTheDay } from '../services/api';
import { ActivityIndicator, Card } from 'react-native-paper';
import useTheme from '../hooks/useTheme';

const ThoughtOfTheDay = () => {
    const [thought,setThought] = useState(null);
    const [loading, setLoading] = useState(true);
    const {styles} = useTheme(getStyles);

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

const getStyles = (theme) => StyleSheet.create({
    thoughtContainer:{
        marginTop:10,
        paddingHorizontal:16,
        backgroundColor:theme.background,
    },
    card:{
        backgroundColor:theme.background,
        padding:10,
        borderRadius:10,
        elevation:10,
        shadowColor:theme.shadowColor,
        shadowOffset:{width:0,height:5},
        shadowOpacity:0.9,
        shadowRadius:4,
        marginTop:8,
    },
    quoteText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign:'center',
        marginBottom:8,
        color:theme.text,
    },
    authorText:{
        fontSize:14,
        fontWeight:'bold',
        textAlign:'right',
        color:theme.text,
    },
});
export default ThoughtOfTheDay;
