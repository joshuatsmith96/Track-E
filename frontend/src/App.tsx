import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import useBoards from "./utilities/hooks/useBoards";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import ErrorPage from "./pages/ErrorPage";
import Registration from "./pages/Registration";
import { Box } from "@mui/material";

export default function App() {
  const { boards } = useBoards();
  console.log(boards);

  return (
    <Box>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Boards />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Box>
  );
}
