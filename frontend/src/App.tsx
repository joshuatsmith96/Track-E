import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/DashboardMenu";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AllBoards from "./pages/AllBoards";
import Board from "./pages/Board";
import ErrorPage from "./pages/ErrorPage";
import ArchivePage from "./pages/Archive";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route path="/" element={<AllBoards />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="/board-archive" element={<ArchivePage />} />
          </Route>
        </Route>

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
