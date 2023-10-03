import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

const flightsSlice = createSlice({
	name: 'flights',
	initialState,
	reducers: {
		updateFlightsReducer(state, action) {
			state.flights = action.payload;
		},
		updateCurrentFlightsReducer(state, action) {
			state.currentFlights = action.payload;
		},
	},
});

export const { updateFlightsReducer, updateCurrentFlightsReducer } = flightsSlice.actions;
export default flightsSlice.reducer;