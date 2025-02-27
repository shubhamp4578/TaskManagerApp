import {darkTheme, lightTheme} from '../utils/theme';
import {createSlice} from '@reduxjs/toolkit';
import {storeData} from '../utils/storage';

const initialState = {
  themeMode: 'light',
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      storeData('themeMode', action.payload);
      state.theme = action.payload === 'dark' ? darkTheme : lightTheme;
    },
    setSystemTheme: (state, action) => {
      state.themeMode = action.payload;
        state.theme = action.payload === 'dark' ? darkTheme : lightTheme;
    },
  },
});

export const {setThemeMode, setSystemTheme} = themeSlice.actions;
export default themeSlice.reducer;
