export default async function getFlightsInfo() {
	const flights = 'flights.json';
	const res = await fetch(flights);
	const data = await res.json();
	return data.result.flights;
}