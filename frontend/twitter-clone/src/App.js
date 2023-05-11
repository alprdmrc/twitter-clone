import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Layout from "./layouts/Layout";
import "./App.css";
import { axiosWithAuth } from "./axiosAuth";
import PrivateRoot from "./components/PrivateRoot";

function App() {
  const [token, setToken] = useState({});
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored_token = localStorage.getItem("token");
    const stored_user_id = localStorage.getItem("user_id");

    if (stored_token && stored_user_id) {
      setToken(stored_token);
      setUserId(stored_user_id);
    }

    if (!stored_token || stored_token === undefined) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    userId &&
      axiosWithAuth()
        .get(`http://localhost:9000/api/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => {
          window.alert(err.response);
        });
  }, [userId]);

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login setToken={setToken} setUserId={setUserId} />}
      />
      {/* <Route path="*" element={<h1>404 NOT FOUND</h1>} /> */}

      <Route
        user={user}
        element={
          <PrivateRoot user={user}>
            <Layout user={user} />
          </PrivateRoot>
        }
      >
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed" element={<Feed />} replace />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
