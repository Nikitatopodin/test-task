function FlightInfo({
	departureCity,
	departureAirport,
	departureAirportId,
	arrivalCity,
	arrivalAirport,
	arrivalAirportId,
	departureDate,
	travelDuration,
	arrivalDate,
}) {
	return (
		<div>
			<div>
				{`${departureCity}, ${departureAirport} (${departureAirportId}) -> ${arrivalCity}, ${arrivalAirport} (${arrivalAirportId})`}
			</div>
			<ul className="flight-info-date">
				<li>{`${departureDate}`}</li>
				<li>{`⌚${Math.floor(travelDuration / 60)} ч ${travelDuration % 60} мин`}</li>
				<li>{`${arrivalDate}`}</li>
			</ul>

		</div>
	);
}

export default FlightInfo;