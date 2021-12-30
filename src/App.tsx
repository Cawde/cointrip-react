import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Home, Register, Login, Dashboard, NavBar } from "./components";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState(null);
  return (
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<div className="home-page"><NavBar/><Home/></div>} />
            <Route path="/register" element={<div className="register-page"><NavBar/><Register /></div>} />
            <Route path="/login" element={<div className="login-page"><NavBar/><Login /></div>} />
            <Route path="/dashboard/:userId" element={<Dashboard />} />
          </Routes>
        </main>
      </Router>
  );
}

export default App;
