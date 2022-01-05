import "../css/Dashboard.css";
import {
  Button,
  Container,
  Modal,
  TextField,
} from "@material-ui/core";
import { ExitToApp, HomeOutlined, Settings } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "./index";
import { getUserIdLS } from "../auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const logo = require("../assets/logo2.png");
toast.configure();

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
  details: string;
}

export default function Dashboard({
  userId,
  setUserId,
  email,
  setEmail,
  customerUrl,
  setCustomerUrl,
  fundingSource,
}: any) {
  let navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [profilePicture, setProfilePicture] = useState("");
  const [showReceived, setShowReceived] = useState(true);
  const [showSent, setShowSent] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function getTransactionHistory() {
    fetch(
      `https://fierce-sea-46269.herokuapp.com/api/users/dashboard/${getUserIdLS()}`
    )
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
    fetch(`https://fierce-sea-46269.herokuapp.com/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        toast.success(result.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(console.error);
    setOpen(false);
  }

  function toggleTransactions() {
    setShowReceived(!showReceived);
    setShowSent(!showSent);
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
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-Partitions">
          <div className="logo-Div">
            <img
              src={logo}
              className="icon"
              alt="Icon for Cointrip, displays a golden coin followed by 3 blue lines that insinuate movement"
            />
          </div>
          <div className="accountProfile-Div">
            <div className="border">
              <span className="name">
                {" "}
                {firstName} {lastName}
              </span>
              <div>{email}</div>
            </div>
          </div>
          <div className="copyright-Info"></div>
          <div className="Home-Div">
            <Link to="/">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<HomeOutlined />}
              >
                Home
              </Button>
            </Link>
          </div>
          <div className="settings-Div">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Settings />}
              onClick={() => setOpen(true)}
            >
              Preferences
            </Button>
          </div>
          <div className="Logout-Div">
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
          </div>
        </div>
      </div>

      <div className="rightSideContainer">
        <div className="toolbar-top">
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleTransactions}
          >
            {showReceived
              ? "Show Transactions Sent"
              : "Show Transactions Received"}
          </Button>
          <div className="searchBar">
            <SearchBar
              userId={userId}
              firstName={firstName}
              lastName={lastName}
              email={email}
              amount={amount}
              customerUrl={customerUrl}
              fundingSource={fundingSource}
            />
          </div>
        </div>
        <div className="transactions">
          <div className="displayTitle">
            {showReceived ? "Received Transactions" : "Sent Transactions"}
          </div>
          <div className="transaction-Details">
            <table>
              <thead>
                <tr className="col-TitlesGrid">
                  <th>Id#</th>
                  <th> Date</th>
                  <th scope="col"> Recipient </th>
                  <th scope="col"> Amount (USD) </th>
                  <th scope="col"> Note </th>
                  <th scope="col"> Details </th>
                </tr>
              </thead>
              {transactions && showReceived
                ? transactions
                    .filter(
                      (transaction: Transaction) =>
                        transaction.recipientId === userId
                    )
                    .map((transaction: Transaction, index: number) => {
                      return (
                        <tbody className="" key={index}>
                          <tr>
                            <th scope="row"> {transaction.id} </th>
                            <td> {transaction.date} </td>
                            <td>
                              {transaction.recipientName}{" "}
                              <div>{transaction.recipientEmail}</div>
                            </td>
                            <td> {formatter.format(transaction.amount)} </td>
                            <td> {transaction.notes} </td>
                            <td>
                              {" "}
                              {transaction.details ? (
                                <a href={transaction.details}> Click Here</a>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                : ""}
              {transactions && showSent
                ? transactions
                    .filter(
                      (transaction: Transaction) =>
                        transaction.initiateId === userId
                    )
                    .map((transaction: Transaction, index: number) => {
                      return (
                        <tbody className="" key={index}>
                          <tr>
                            <th scope="row"> {transaction.id} </th>
                            <td> {transaction.date} </td>
                            <td>
                              {transaction.recipientName}{" "}
                              <div>{transaction.recipientEmail}</div>
                            </td>
                            <td> {formatter.format(transaction.amount)} </td>
                            <td> {transaction.notes} </td>
                            <td>
                              {" "}
                              {transaction.details ? (
                                <a href={transaction.details}> Click Here</a>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                : ""}
            </table>
          </div>
        </div>
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
