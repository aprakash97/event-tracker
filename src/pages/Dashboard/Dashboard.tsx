import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { useEffect, useState } from 'react'
import { getEventsList } from '../../redux/action/dashboardAction'
// import { resetState, setStateNumber } from '../../redux/slice/dashboardSlice'
// import { EVENT_DATA } from '../../utilities/constants';
// import EventBox from '../../components/Dashboard/EventBox';

const Dashboard = () => {
    const dashboardState = useSelector((state: RootState) => state.dashboard)
    const dispatch = useDispatch<AppDispatch>()

    const [selectedHost, setSelectedHost] = useState<undefined | string>(undefined)
    const [page, setPage] = useState(1);
    // const [isFiltered, setIsFiltered] = useState(false)

    // const increase = () => {
    //     dispatch(setStateNumber())
    // }


    // const reset = () => {
    //     dispatch(resetState())
    // }


    // useEffect(() => {
    //     dispatch(getEventsList())
    // }, [])

    // const setHostNameFilter = () => {

    // }

    useEffect(() => {
        dispatch(getEventsList({ page }));
    }, [page]);

    return (
        <div className='past-orders'>
            <h1>Dashboard</h1>
            <form>
                <label htmlFor="pizza-type">Host Name</label>
                <select
                    onChange={(e) => setSelectedHost(e.target.value)}
                    name="pizza-type"
                    value={selectedHost}
                >
                    <option value="" disabled>
                        Enter Host Name
                    </option>
                    {dashboardState.hostData.map((host, index) => (
                        <option key={index} value={host}>
                            {host}
                        </option>
                    ))}
                </select>

                {/* <label htmlFor="filter-start">Start date:</label>
                <input
                    type="date"
                    id="start"
                    name="event-start"
                    value="2018-07-22"
                    min="2018-01-01"
                    max="2018-12-31" />

                <label htmlFor="filter-end">End date:</label>
                <input
                    type="date"
                    id="filter-end"
                    name="event-end"
                    value="2018-07-22"
                    min="2018-01-01"
                    max="2018-12-31" /> */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                    padding: '1rem'
                }}>
                    <button style={{ padding: '0.5rem 1rem' }}>Filter</button>
                    <button style={{ padding: '0.5rem 1rem' }}>Reset</button>
                </div>
            </form>

            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Venue</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {dashboardState.eventListData.map((event) => (
                        <tr key={event.id}>
                            <td>
                                {/* <button onClick={() => setFocusedOrder(order.order_id)}>
                                    {order.order_id}
                                </button> */}
                                {event.title}
                            </td>
                            <td>{event.venue}</td>
                            <td>{event.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pages">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                </button>
                <div>{page}</div>
                <button disabled={page === dashboardState.totalPages} onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Dashboard