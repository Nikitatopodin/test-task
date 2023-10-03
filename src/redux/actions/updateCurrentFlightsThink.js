import { updateCurrentFlightsReducer } from "../slices/flightsSlice";

const updateCurrentFlightsThunk = (arr, sortFunc) => async (dispatch) => {
	if (sortFunc) {
		const newArr = arr.toSorted(sortFunc);
		dispatch(updateCurrentFlightsReducer(newArr))
	} else {
		dispatch(updateCurrentFlightsReducer(arr));
	}
}

export default updateCurrentFlightsThunk;