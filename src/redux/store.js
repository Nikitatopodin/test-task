import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import flights from './slices/flightsSlice';

const rootReducer = combineReducers({
	flights,
});

const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export const store = setupStore();