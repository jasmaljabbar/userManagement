import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/login/Login";
import Home from "./Components/home/Home";
import Register from "./Components/register/Register";
import Profile from "./Components/profile/Profile";
import Admin from "./Components/admin/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
