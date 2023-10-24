import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';

const store = configureStore({
	reducer: {
		[apiSlice.reducer]: apiSlice.reducerPath,
	},
	middleware: (getDefaultMiddlewares) =>
		getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
