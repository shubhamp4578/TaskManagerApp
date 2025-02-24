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
        console.log(email);
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

export const getUserEmail = async () => {
    try {
        const value = await AsyncStorage.getItem('userEmail');
        return value;
    } catch (error) {
        console.error('Error while getting the user email ',error);
        return false;
    }
};
export const getUserLoggedIn = async () => {
    try {
        const loggedIn = await AsyncStorage.getItem('isUserLoggedIn');
        const email = await AsyncStorage.getItem('userEmail');

        console.log('Retrieved email type:', typeof email, 'Value:', email);
        console.log('Retrieved isUserLoggedIn type:', typeof loggedIn, 'Value:', loggedIn);

        return { loggedIn: JSON.parse(loggedIn), email };
    } catch (error) {
        console.error('Error retrieving login status: ', error);
        return null;
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

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key,value);
    } catch (error) {
        console.error('Error while storing data,',error);
    }
};
export const getData = async (key) => {
    try {
        let value = await AsyncStorage.getItem(key);
        console.log(`value is ${value} and its type is ${typeof value}`);
        return value;
    } catch (error) {
        console.log('Error occured while fetching data:- ',error);
    }
};
