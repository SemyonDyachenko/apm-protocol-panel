import LoginPage from "./pages/login"
import MainPage from "./pages/main"
import { BrowserRouter as Router, useNavigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="h-full w-full">
      <Router>
        <Routes>
          <Route index path="/" element={<MainPage />} />
          <Route path="/auth" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
