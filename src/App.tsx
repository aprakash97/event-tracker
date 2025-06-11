import { Route, BrowserRouter, Routes } from "react-router-dom"
import { AttendeeInfo, Dashboard } from "./pages"
import { APP_ROUTES } from "./utilities/constants"

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={APP_ROUTES.ATTENDEE_PROFILE} element={<AttendeeInfo />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
