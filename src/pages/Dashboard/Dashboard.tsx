import { Autocomplete, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { resetState, setStateNumber } from '../../redux/slice/dashBoardSlice'
import { useEffect } from 'react'
import { getEventsList } from '../../redux/action/dashBoardAction'
// import { EVENT_DATA } from '../../utilities/constants';
// import EventBox from '../../components/Dashboard/EventBox';

const Dashboard = () => {
    const dashboardState = useSelector((state: RootState) => state.dashboard)
    const dispatch = useDispatch<AppDispatch>()

    const increase = () => {
        dispatch(setStateNumber())
    }


    const reset = () => {
        dispatch(resetState())
    }

    useEffect(() => {
        dispatch(getEventsList())
    }, [])

    console.log('TESTING', dashboardState);
    return (
        <Paper>
            <Typography variant='body1'>Dashboard</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <Autocomplete
                        size="small"
                        disablePortal
                        value={null}
                        onChange={() => { }}
                        options={[]}
                        renderInput={(params) => (
                            <TextField {...params}
                                label={"Host"}
                                placeholder="Enter Host Name"
                            // required={editLotForm.standard.isRequired}
                            // error={!!editLotForm.standard.error}
                            // helperText={editLotForm.standard.error !== '' ? editLotForm.standard.error : ''}
                            />
                        )}
                    />
                    <Button variant="contained">{dashboardState.stateNumber}</Button>
                    <Button variant="contained" onClick={increase}>Add</Button>
                    <Button variant="contained" onClick={reset}>Reset</Button>
                </Grid>
                {/* <Grid size={{ xs: 12, md: 12, xl: 12 }} sx={{ display: 'flex', margin: 10 }}>
                    {EVENT_DATA.map((event) => (
                        <EventBox
                            id={event.id}
                            img={event.img}
                            title={event.title}
                            host={event.host}
                            venue={event.venue}
                            attendees={[]} />
                    ))}
                </Grid> */}
                <Grid size={{ xs: 8, md: 8, xl: 8 }} p={1} m={5} textAlign={"center"}>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ background: 'grey' }}>
                                    <TableCell width={50}>Name</TableCell>
                                    <TableCell width={500}>Venue</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Musical</TableCell>
                                    <TableCell >Ground</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Musical</TableCell>
                                    <TableCell >Indoor</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Musical</TableCell>
                                    <TableCell >Cultural Central</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Dashboard