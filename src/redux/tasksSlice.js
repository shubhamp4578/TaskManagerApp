import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks:[],
  loading: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    clearTasks: state => {
      state.tasks = [];
    },
  },
});

export const {setTasks, setLoading, clearTasks} = taskSlice.actions;

export default taskSlice.reducer;
