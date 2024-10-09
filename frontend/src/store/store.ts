import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Adjust the import path as needed

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
