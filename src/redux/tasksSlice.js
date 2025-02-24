import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  priorityTasks: [],
  quickActionTasks: [],
  progressTasks: [],
  optionalTasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      const {category, tasks} = action.payload;
      switch (category) {
        case 'Priority':
          state.priorityTasks = tasks;
          break;
        case 'Quick Action':
          state.quickActionTasks = tasks;
          break;
        case 'Progress':
          state.progressTasks = tasks;
          break;
        case 'Optional':
          state.optionalTasks = tasks;
          break;
        default:
          break;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    clearTasks: state => {
      state.priorityTasks = [];
      state.quickActionTasks = [];
      state.optionalTasks = [];
      state.progressTasks = [];
    },
  },
});

export const {setTasks, setLoading, clearTasks} = taskSlice.actions;

export default taskSlice.reducer;
