import { createSlice } from '@reduxjs/toolkit';
import { getData, storeData } from '../utils/storage';

const defaultColors = {
    Priority : '#FD0362',
    QuickAction : '#F79E1B',
    Progress : '#007AFF',
    Optional : '#6C757D',
};


const categoryColorSlice = createSlice({
    name: 'categoryColors',
    initialState: defaultColors,
    reducers: {
        setCategoryColor: (state, action) => {
            const {category, color} = action.payload;
            state[category] = color;
        },
        loadCategoryColors: (state, action) => {
            return action.payload || defaultColors;
        },
    },
});


export const {setCategoryColor, loadCategoryColors} = categoryColorSlice.actions;

export const fetchCategoryColors = () => async (dispatch) => {
    try {
        const storedColors = await getData('taskColors');
        if(storedColors) {
            dispatch(loadCategoryColors(JSON.parse(storedColors)));
        }
    } catch (error) {
        console.error('Error loading cateogry colors: ',error);
    }
};

export const saveCategoryColor = (category, color) => async (dispatch, getState) => {
    dispatch(setCategoryColor({category, color}));

    try {
        const newColors = getState().categoryColors;
        await storeData('taskColors',JSON.stringify(newColors));
    } catch (error) {
        console.error('Error saving category colors: ',error);
    }
};


export default categoryColorSlice.reducer;
