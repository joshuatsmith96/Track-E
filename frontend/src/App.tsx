import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./layout/Header";
import useBoards from "./utilities/hooks/useBoards";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import ErrorPage from "./pages/ErrorPage";
import Registration from "./pages/Registration";

export default function App() {
  const { boards } = useBoards();
  console.log(boards);

  return (
    <Router>
      <Header />
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
  );
}
