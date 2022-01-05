import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Home, Register, Login, Dashboard, NavBar, AddBank } from "./components";
import { useState } from "react";
import VerifyUser from "./components/VerifyUser";

function App() {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [customerUrl, setCustomerUrl] = useState("");
  const [fundingSource, setFundingSource] = useState("");
  const [password, setPassword] = useState("");



  return (
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<div className="home-page-container"><Home/></div>} />
            <Route path="/register" element={<div className="register-page"><NavBar/><Register firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setUserId={setUserId}/></div>} />
            <Route path="/login" element={<div className="login-page"><NavBar/><Login setFundingSource={setFundingSource} setFirstName={setFirstName} setLastName={setLastName} password={password} setPassword={setPassword} setUserId={setUserId} email={email} setEmail={setEmail}/></div>} />
            <Route path="/dashboard/:userId" element={<Dashboard userId={userId} fundingSource={fundingSource} setUserId={setUserId} email={email} setEmail={setEmail} customerUrl={customerUrl} setCustomerUrl={setCustomerUrl}/>} />
            <Route path="/add-bank" element={<AddBank fundingSource={fundingSource} setFundingSource={setFundingSource} customerUrl={customerUrl} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/> }/>
            <Route path="/verify-user" element={<VerifyUser customerUrl={customerUrl} setCustomerUrl={setCustomerUrl} firstName={firstName} lastName={lastName}/>}/>
          </Routes>
        </main>
      </Router>
  );
}

export default App;
