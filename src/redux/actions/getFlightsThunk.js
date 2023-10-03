import getFlightsInfo from "../../services/getFlightsInfo";
import { updateFlightsReducer, updateCurrentFlightsReducer } from "../slices/flightsSlice";

const getFlightsThunk = () => async (dispatch) => {
	try {
		const res = await getFlightsInfo();
		dispatch(updateFlightsReducer(res));
		dispatch(updateCurrentFlightsReducer(res))
	} catch (e) {
		console.error(e);
	}
}
export default getFlightsThunk;