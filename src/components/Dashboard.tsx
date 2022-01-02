import "../css/Dashboard.css";
import { Button, Card, CardContent, Container, Modal, TextField, Typography } from "@material-ui/core";
import { ExitToApp, HomeOutlined, Settings } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "./index";
// import { getToken, getUserId } from "../auth";

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

export default function Dashboard({ userId, setUserId }: any) {
  let navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  function getTransactionHistory() {
    fetch(`http://localhost:5000/api/users/dashboard/${userId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTransactions(result.userTransactions);
        setFirstName(result.user.firstName);
        setLastName(result.user.lastName);
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
          console.log(result);
          alert(result.message);
        })
        .catch(console.error);
        setOpen(false);
  }

  function signOut() {
    setUserId(null);
    return <Link to="/"></Link>;
  }

  useEffect(() => {
    if (!userId) {
      return navigate("/login");
    }
    try {
      getTransactionHistory();
    } catch (error) {
      console.error(error);
      return navigate("/login");
    }
  }, []);

  return (
    
    <div className="dashboard-page">
      <section className="dashboard-sidebar">
        <ul>
          <li>
            <Link to="/">
              <Button variant="outlined" color="primary" startIcon={<HomeOutlined />}>
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
                      <Typography variant="h5">id: {transaction.id}</Typography>
                      <Typography variant="h5">{transaction.initiateName}</Typography>
                      <Typography variant="h5">{transaction.initiateEmail}</Typography>
                      <Typography variant="h5">{transaction.amount} USD</Typography>
                      <Typography variant="h5">{transaction.date}</Typography>
                      <Typography variant="h5">{transaction.notes}</Typography>
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
                    <ul>
                      <li>id: {transaction.id}</li>
                      <li>amount: {transaction.amount} USD</li>
                      <li>Recipient name: {transaction.recipientName}</li>
                      <li>Recipient email: {transaction.recipientEmail}</li>
                      <li>date: {transaction.date}</li>
                      <li>notes: {transaction.notes}</li>
                    </ul>
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
