import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import updateCurrentFlightsThunk from "../redux/actions/updateCurrentFlightsThink";

function SortAndFilter() {
	const dispatch = useDispatch();
	const flightsInfo = useSelector((state) => state.flights);
	const [sortAndFilters, setSortAndFilters] = useState({
		sort: () => { },
		filters: {
			transfers: {
				noTransfer: false,
				oneTransfer: false,
			},
			price: {
				minValue: 0,
				maxValue: 1000000,
			},
			carriers: {
				AirFrance: false,
				KLM: false,
				Aeroflot: false,
				TURK: false,
				Finnair: false,
				AirBaltic: false,
				Alitalia: false,
				Pegasus: false,
				Burssels: false,
				LOT: false,
			}
		}
	})

	function ascendingPriceSort(a, b) {
		return a.flight.price.total.amount - b.flight.price.total.amount;
	};
	function descendingPriceSort(a, b) {
		return b.flight.price.total.amount - a.flight.price.total.amount;
	};
	function ascendingTravelDurationSort(a, b) {
		return a.flight.legs.reduce((acc, elem) => { return acc + elem.duration }, 0) - b.flight.legs.reduce((acc, elem) => { return acc + elem.duration }, 0)
	};

	useEffect(() => {
		if (flightsInfo.currentFlights) {
			const transferFilters = [];
			if (sortAndFilters.filters.transfers.noTransfer) {
				transferFilters.push(1)
			}
			if (sortAndFilters.filters.transfers.oneTransfer) {
				transferFilters.push(2)
			}
			if (transferFilters.length > 0) {
				const arr = flightsInfo.flights.filter(elem => transferFilters.includes(elem.flight.legs[0].segments.length
					|| elem.flight.legs[1].segments.length));
				const arrTwo = arr.filter(elem => +elem.flight.price.total.amount >= +sortAndFilters.filters.price.minValue &&
					+elem.flight.price.total.amount <= +sortAndFilters.filters.price.maxValue
				)
				dispatch(updateCurrentFlightsThunk(arrTwo, sortAndFilters.sort))
			} else {
				const arr = flightsInfo.flights.filter(elem => +elem.flight.price.total.amount >= +sortAndFilters.filters.price.minValue &&
					+elem.flight.price.total.amount <= +sortAndFilters.filters.price.maxValue
				)
				dispatch(updateCurrentFlightsThunk(arr, sortAndFilters.sort))
			}
		}

	}, [sortAndFilters])

	const changeSortState = (value) => {
		setSortAndFilters({
			...sortAndFilters,
			sort: value
		})
	}

	const changeTransferState = (id) => {
		setSortAndFilters(current => {
			return {
				...current,
				filters: {
					...current.filters,
					transfers: {
						...current.filters.transfers,
						[id]: !current.filters.transfers[id]
					}
				}
			}
		})
	}

	const changeMinPriceState = (min) => {
		setSortAndFilters(current => {
			return {
				...current,
				filters: {
					...current.filters,
					price: {
						...current.filters.price,
						minValue: min
					}
				}
			}
		})
	}

	const changeMaxPriceState = (max) => {
		setSortAndFilters(current => {
			return {
				...current,
				filters: {
					...current.filters,
					price: {
						...current.filters.price,
						maxValue: max
					}
				}
			}
		})
	}

	const changeCarriersState = (carrier) => {
		setSortAndFilters(current => {
			return {
				...current,
				filters: {
					...current.filters,
					carriers: {
						...current.filters.carriers,
						carrier
					}
				}
			}
		})
	}

	return (
		<div>
			<div className="sort">
				<span>Сортировать</span>
				<div>
					<input type="radio" name="sort" id="priceAsc" onClick={() => changeSortState(ascendingPriceSort)} />
					<label htmlFor="priceAsc">- по возрастанию цены</label>
				</div>
				<div>
					<input type="radio" name="sort" id="priceDesc" onClick={() => changeSortState(descendingPriceSort)} />
					<label htmlFor="priceDesc">- по убыванию цены</label>
				</div>
				<div>
					<input type="radio" name="sort" id="travelDur" onClick={() => changeSortState(ascendingTravelDurationSort)} />
					<label htmlFor="travelDur">- по времени в пути</label>
				</div>
			</div>
			<div className="filters">
				<span>Фильтровать</span>
				<div>
					<div>
						<input type="checkbox" name="transfer" id='noTransfer' onClick={(e) => changeTransferState(e.target.id)} />
						<label htmlFor="noTransfer" onClick={(e) => e.preventDefault()}>без пересадок</label>
					</div>
					<div>
						<input type="checkbox" name="transfer" id='oneTransfer' onClick={(e) => changeTransferState(e.target.id)} />
						<label htmlFor="noTransfer" onClick={(e) => e.preventDefault()}>1 пересадка</label>
					</div>
				</div>
				<div className="price-filter">
					<span>Цена</span>
					<div>
						<label htmlFor="minPrice" >от</label>
						<input type="number" id="minPrice" placeholder="0" onChange={(e) => changeMinPriceState(e.target.value)} />
					</div>
					<div>
						<label htmlFor="maxPrice">до</label>
						<input type="number" id="maxPrice" placeholder="1000000" onChange={(e) => changeMaxPriceState(e.target.value)} />
					</div>
				</div>
				<div className="carriers-filter">
					<span>Авиакомпании</span>
					{flightsInfo.currentFlights ? Array.from(new Set(flightsInfo.currentFlights.map(elem => elem.flight.carrier.caption))).map((e, index) => {
						return (
							<div className="carriers-list">
								<input type="checkbox" name="carrier" id={`carrier${index}`} />
								<label htmlFor={`carrier${index}`}>{e}</label>
							</div>
						)
					}) : ''}
				</div>
			</div>
		</div>
	)
}
export default SortAndFilter;