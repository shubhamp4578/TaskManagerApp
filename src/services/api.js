import axios from 'axios';

const BASE_URL = 'https://zenquotes.io/api';

export const fetchThoughtOfTheDay = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/random`);
        if(response.data.length > 0) {
            const {q,a} = response.data[0];
            return {quote: q, author:a};
        }
        return null;
    } catch (error) {
        console.error('Error fetching Thought of the Day:', error);
        return null;
    }
};
