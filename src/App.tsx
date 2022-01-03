import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Home, Register, Login, Dashboard, NavBar } from "./components";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  return (
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<div className="home-page-container"><Home/></div>} />
            <Route path="/register" element={<div className="register-page"><NavBar userId={userId}/><Register setUserId={setUserId}/></div>} />
            <Route path="/login" element={<div className="login-page"><NavBar userId={userId}/><Login setUserId={setUserId} email={email} setEmail={setEmail}/></div>} />
            <Route path="/dashboard/:userId" element={<Dashboard userId={userId} setUserId={setUserId} email={email} setEmail={setEmail}/>} />
          </Routes>
        </main>
      </Router>
  );
}

export default App;
