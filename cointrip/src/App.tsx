import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Home, Register, Login, Dashboard, NavBar } from "./components";

function App() {
  return (
    <div className="App">
      
      <Router>
        <NavBar/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard/:userId" element={<Dashboard/>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
