import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserFirstTime = async (value) => {
    try {
        await AsyncStorage.setItem('isUserFirstTime',JSON.stringify(value));
    }catch (error) {
        console.error('Error saving First time user status: ', error);
    }
};

export const isUserFirstTime = async () => {
    try{
        const value = await AsyncStorage.getItem('isUserFirstTime');
        return value ? JSON.parse(value) : true;
    }catch (error) {
        console.error('Error gettitng first-time user status:',error);
        return true;
    }
};

export const setUserLoggedIn = async (loggedIn,email) => {
    try {
        await AsyncStorage.setItem('isUserLoggedIn',JSON.stringify(loggedIn));
        await AsyncStorage.setItem('userEmail',email);
    } catch (error) {
        console.error('Error saving login status: ',error);
    }
};
export const isUserLoggedIn = async () => {
    try{
        const value = await AsyncStorage.getItem('isUserLoggedIn');
        return value;
    }catch (error) {
        console.error('Error gettitng user Email:',error);
        return false;
    }
};

export const clearUserSession = async () => {
    try {
        await AsyncStorage.removeItem('isUserLoggedIn');
        await AsyncStorage.removeItem('userEmail');
    } catch (error) {
        console.error('Error clearing session :', error);
    }
};
