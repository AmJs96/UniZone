import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Message from "./Pages/Message";
import Profile from "./Pages/Profile";
import Welcome from "./Pages/Welcome";
import AuthContextProvider from "./AuthContextProvider";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Routes>
          <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              exact
              path="/Home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/message"
              element={
                <ProtectedRoute>
                  <Message />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
