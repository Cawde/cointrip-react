import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Home, Register, Login, Dashboard, NavBar } from "./components";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <div className="App">
      
      <Router>
        <NavBar/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/:userId" element={<Dashboard />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
