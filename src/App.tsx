import CompetitorsSection from "./pages/competitors"
import LoginPage from "./pages/login"
import MainPage from "./pages/main"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import TournamentsPage from "./pages/tournaments"
import TournamentPage from "./pages/tournament"
import Logout from "./pages/logout"
import SettingsPage from "./pages/settings"
import CompetitorEditing from "./pages/editCompetitor"

function App() {
  return (
    <div className="h-full w-full">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="" element={<TournamentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route
              path="tournament/:tournamentId"
              element={<TournamentPage />}
            />
            <Route
              path="competitor/editing/:registrationId"
              element={<CompetitorEditing />}
            />
          </Route>
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
