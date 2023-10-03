import './App.css';
import { useDispatch } from 'react-redux';
import SortAndFilter from './components/SortAndFilter';
import FlightsList from './components/FlightsList';
import { useEffect } from 'react';
import getFlightsThunk from './redux/actions/getFlightsThunk';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlightsThunk());
  }, []);

  return (
    <div className='wrapper'>
      <SortAndFilter />
      <FlightsList />
    </div>
  )
}
export default App;
