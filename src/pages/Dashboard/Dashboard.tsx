import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { useEffect, useState } from 'react'
import { getEventsList } from '../../redux/action/dashboardAction'
import { setFilter } from '../../redux/slice/dashboardSlice'
import type { DashboardTileDto } from '../../utilities/models'

const Dashboard = () => {
    const dashboardState = useSelector((state: RootState) => state.dashboard)
    const dispatch = useDispatch<AppDispatch>()

    const [selectedHost, setSelectedHost] = useState<undefined | string>(undefined)
    const [page, setPage] = useState(1)
    const [isFiltered, setIsFiltered] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<DashboardTileDto | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onFilter = () => {
        setIsFiltered(true)
        dispatch(setFilter(selectedHost))
    }

    useEffect(() => {
        dispatch(getEventsList({ page }));
    }, [page]);

    const handleEventClick = (event: DashboardTileDto) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    if (dashboardState.isLoading) {
        return (
            <div className="event-table">
                <h2>LOADING …</h2>
            </div>
        );
    }

    return (
        <div className='event-table'>
            <h2>Dashboard</h2>
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
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                    padding: '1rem'
                }}>
                    <button style={{ padding: '0.5rem 1rem' }} disabled={isFiltered} onClick={(e) => {
                        e.preventDefault()
                        onFilter()
                    }}>Filter</button>
                    <button style={{ padding: '0.5rem 1rem' }}>Reset</button>
                </div>
            </form>


            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Venue</td>
                        <td>Host</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {!isFiltered && dashboardState.eventListData.map((event) => (
                        <tr key={event.id} onClick={() => handleEventClick(event)}>
                            <td>
                                {/* <button onClick={() => setFocusedOrder(order.order_id)}>
                                    {order.order_id}
                                </button> */}
                                {event.title}
                            </td>
                            <td>{event.venue}</td>
                            <td>{event.host}</td>
                            <td>{event.date}</td>
                        </tr>
                    ))}
                    {isFiltered && dashboardState.eventListFilterData.map((event) => (
                        <tr key={event.id} onClick={() => handleEventClick(event)}>
                            <td>
                                {/* <button onClick={() => setFocusedOrder(order.order_id)}>
                                    {order.order_id}
                                </button> */}
                                {event.title}
                            </td>
                            <td>{event.venue}</td>
                            <td>{event.host}</td>
                            <td>{event.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!isFiltered && (
                <div className="pages">
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                        Previous
                    </button>
                    <div>{page}</div>
                    <button disabled={page === dashboardState.totalPages} onClick={() => setPage(page + 1)}>
                        Next
                    </button>
                </div>
            )}

            {isModalOpen && selectedEvent && (
                <div id='modal'>
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                        <h2>{selectedEvent.title} Details</h2>
                        <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                        <p><strong>Attendees:</strong>{selectedEvent.attendees?.length === 0 ? "No Attendees" : selectedEvent.attendees?.map((attendee) => attendee.toUpperCase()).join(",")}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Dashboard