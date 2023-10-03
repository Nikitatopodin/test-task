import { useEffect, useState } from 'react';
import getFlightInfo from '../services/getFlightsInfo';
import FlightInfo from '../components/FlightInfo';
import { useSelector } from 'react-redux';

function FlightsList() {
	const flightsInfo = useSelector((state) => state.flights)
	console.log(flightsInfo)
	return (
		<div className='flights-list'>
			{flightsInfo.currentFlights ? flightsInfo.currentFlights.map((info, i) => {
				return info.flight.legs.map((leg, index) => {
					return (
						<>
							{index % 2 === 0 ? <div>{`Стоимость для одного взрослого пассажира: ${info.flight.price.total.amount} ₽`}</div> : ''}
							<FlightInfo
								departureCity={leg.segments[0].departureCity ? leg.segments[0].departureCity.caption : ''}
								departureAirport={leg.segments[0].departureAirport.caption}
								departureAirportId={leg.segments[0].departureAirport.uid}
								arrivalAirport={leg.segments[1] ? leg.segments[1].arrivalAirport.caption : leg.segments[0].arrivalAirport ? leg.segments[0].arrivalAirport.caption : ''}
								arrivalAirportId={leg.segments[1] ? leg.segments[1].arrivalAirport.uid : leg.segments[0].arrivalAirport ? leg.segments[0].arrivalAirport.uid : ''}
								arrivalCity={leg.segments[1] ? leg.segments[1].arrivalCity ? leg.segments[1].arrivalCity.caption : '' : leg.segments[0].arrivalCity.caption}
								departureDate={leg.segments[0].departureDate}
								arrivalDate={leg.segments[0].arrivalDate}
								travelDuration={leg.duration}
							/>
							{index % 2 !== 0 ?
								<>
									<div>Рейс выполняет: {flightsInfo.currentFlights[i].flight.carrier.caption}</div>
									<div>_______________________________________</div>
								</>
								: ''}
						</>
					)
				})
			}) : 'Loading...'}

		</div>
	);
}
export default FlightsList;