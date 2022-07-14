import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Secret from "./Pages/Secret";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Secret />} />
      </Routes>
    </Router>
  );
};

export default App;
