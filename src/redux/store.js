import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tasksReducer from './tasksSlice';
import themeReducer from './themeSlice';
import categoryColorsReducer from './categoryColorSlice';
export const store = configureStore({
    reducer:{
        user: userReducer,
        tasks: tasksReducer,
        theme: themeReducer,
        categoryColors: categoryColorsReducer,
    },
});
