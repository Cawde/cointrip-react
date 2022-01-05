import "../css/Dashboard.css";
import { Button, Card, CardContent, Container, Modal, TextField, Typography } from "@material-ui/core";
import { ExitToApp, HomeOutlined, Settings } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar} from "./index";
import { getUserIdLS } from "../auth";

interface Transaction {
  id: number;
  initiateId: number;
  initiateName: string;
  initiateEmail: string;
  amount: number;
  recipientId: number;
  recipientName: string;
  recipientEmail: string;
  date: Date;
  notes: string;
}

export default function Dashboard({ userId, setUserId, email, setEmail, customerUrl, setCustomerUrl, fundingSource }: any) {
  let navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [profilePicture, setProfilePicture] = useState("");

  function getTransactionHistory() {
    fetch(`http://localhost:5000/api/users/dashboard/${getUserIdLS()}`)
      .then((response) => response.json())
      .then((result) => {
        setTransactions(result.userTransactions);
        setFirstName(result.user.firstName);
        setLastName(result.user.lastName);
        setCustomerUrl(result.user.customerUrl);
        setProfilePicture(result.user.profilePicture);
      })
      .catch(console.error);
  }

  function editUser(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
      fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          alert(result.message);
        })
        .catch(console.error);
        setOpen(false);
  }


  function signOut() {
    setUserId(null);
    localStorage.clear();
    return <Link to="/"></Link>;
  }


 


  useEffect(() => {
    if (!getUserIdLS()) {
      return navigate("/login");
    } else {
      try {
        getTransactionHistory();
      } catch (error) {
        console.error(error);
        return navigate("/login");
      }
    }
  }, []);

  return (
    <div className="dashboard-page">
      <SearchBar
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        email={email}
        amount={amount}
        customerUrl={customerUrl}
        fundingSource={fundingSource}
      />
      <section className="dashboard-sidebar">
        <ul>
          <li>
            <Link to="/">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<HomeOutlined />}
              >
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Settings />}
              onClick={() => setOpen(true)}
            >
              Preferences
            </Button>
          </li>
          <Link to="/">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ExitToApp />}
              onClick={signOut}
            >
              Sign out
            </Button>
          </Link>
        </ul>
      </section>

      <div>
        Transactions recieved:
        {transactions
          ? transactions
              .filter(
                (transaction: Transaction) => transaction.recipientId === userId
              )
              .map((transaction: Transaction, index: number) => {
                return (
                  <Card className="transaction-results" key={index}>
                    <CardContent>
                      <Typography variant="h5">
                        {transaction.initiateName} sent you ${" "}
                        {transaction.amount}{" "}
                      </Typography>
                      <Typography variant="h5">
                        {transaction.initiateEmail}
                      </Typography>
                      <Typography variant="h5">{transaction.date}</Typography>
                      <Typography variant="h5">
                        Message: {transaction.notes}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })
          : "You have no transactions recieved"}
      </div>
      <div>
        Transactions sent:
        {transactions
          ? transactions
              .filter(
                (transaction: Transaction) => transaction.initiateId === userId
              )
              .map((transaction: Transaction, index: number) => {
                return (
                  <div className="transaction-results" key={index}>
                    <Card className="transaction-results" key={index}>
                      <CardContent>
                        <Typography variant="h5">
                          You sent {transaction.recipientName} $
                          {transaction.amount}
                        </Typography>
                        <Typography variant="h5">
                          {transaction.recipientEmail}
                        </Typography>
                        <Typography variant="h5">{transaction.date}</Typography>
                        <Typography variant="h5">
                          Message: {transaction.notes}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
              })
          : "You have no transactions sent"}
      </div>
      <Modal open={open} className="edit-modal-container">
        <div className="edit-form-container">
          <Container className="material-container">
            <p>Edit first name or last name.</p>
            <form
              className="register-form"
              autoComplete="off"
              onSubmit={(event) => {
                editUser(event);
              }}
            >
              <TextField
                className="input-field"
                autoComplete="off"
                id="standard-basic"
                label="First Name"
                size="small"
                placeholder={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <TextField
                className="input-field"
                autoComplete="off"
                id="standard-basic"
                label="Last Name"
                size="small"
                placeholder={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
              <p>Enter email and password for verification below</p>
              <TextField
                className="input-field"
                autoComplete="off"
                required
                id="standard-basic"
                label="Email"
                size="small"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                className="input-field"
                autoComplete="off"
                required
                id="standard-basic"
                label="Password"
                size="small"
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                id="editBtn"
              >
                Submit Changes
              </Button>
            </form>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              id="editBtn"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </Container>
        </div>
      </Modal>
    </div>
  );
}
