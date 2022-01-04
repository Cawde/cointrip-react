import "../css/Dashboard.css";
import { Button, Card, CardContent, Container, Modal, TextField, Typography } from "@material-ui/core";
import { ExitToApp, HomeOutlined, Settings } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Login, SearchBar, CardPayout, VerifyUserModal } from "./index";
import StripeCheckout from "react-stripe-checkout";
import VerifyBankModal from "./AddBank";
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



export default function Dashboard(this: any, { userId, setUserId, email, setEmail, setCustomerUrl }: any) {
  let navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [openStripe, setOpenStripe] = useState(false);
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [openVUM, setOpenVUM] = useState(false);
  const [openBM, setOpenBM] = useState(false);
  const [dwollaToken, setDwollaToken] = useState("");
  const balance = 30;

  function getTransactionHistory() {
    fetch(`http://localhost:5000/api/users/dashboard/${userId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTransactions(result.userTransactions);
        setFirstName(result.user.firstName);
        setLastName(result.user.lastName);
        setCustomerUrl(result.user.customerUrl)
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

  function createTransaction() {
    fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initiateId: userId,
          initiateName: firstName,
          initiateEmail: email,
          amount: amount,
          recipientId: recipientId,
          recipientName: recipientName,
          recipientEmail: recipientEmail,
          date: new Date(),
          notes: note
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch(console.error);
  }

  function signOut() {
    setUserId(null);
    localStorage.clear();
    return <Link to="/"></Link>;
  }


  //Stripe stuff below

  // function handleToken(token: any) {
  //   console.log({token})
  //   const fullName = `${firstName} ${lastName}`;
  //   fetch("http://localhost:5000/api/transactions/checkout", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }, 
  //     body: JSON.stringify({
  //       token,
  //       name: fullName,
  //       amount: amount
  //     })
  //   })
  //   .then((response) => response.json())
  //   .then((result) => {
  //     console.log(result);
  //     if (result.message === "Success") {
  //       try {
  //         createTransaction();
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   })
  // }



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
      <SearchBar setOpenStripe={setOpenStripe} setRecipientId={setRecipientId} setRecipientName={setRecipientName} setRecipientEmail={setRecipientEmail}/>
      <button onClick={() => navigate("/dashboard/payout")}>Deposit balance: $ {balance}</button>
      <button onClick={() => setOpenVUM(true)}>Verify your account to send and accept money</button>
      <button onClick={() => navigate("/add-bank")}>Add a bank to send money to other users</button>
      <VerifyUserModal openVUM={openVUM} setOpenVUM={setOpenVUM} firstName={firstName} lastName={lastName} email={email} userId={userId}/>
      {/* <VerifyBankModal openBM={openBM} setOpenBM={setOpenBM}/> */}
      {/* <Modal open={openStripe} className="edit-modal-container">
        <div className="edit-form-container">
          <Container className="material-container">
            <p>Enter the information below</p>
            <form
              className="register-form"
              autoComplete="off"
              onSubmit={(event) => {
                editUser(event);
              }}
            >
              <TextField8
                className="input-field"
                autoComplete="off"
                id="standard-basic"
                label="Enter amount to send"
                size="small"
                type="number"
                required
                onChange={(event) => {
                  setAmount(Number(event.target.value));
                }}
              />
              <TextField
                className="input-field"
                autoComplete="off"
                id="standard-basic"
                label="Note"
                size="small"
                required
                onChange={(event) => {
                  setNote(event.target.value);
                }}
              />
            </form>
            <div onClick={() => setOpenStripe(false)}>
              <StripeCheckout
                stripeKey="pk_test_51KAMy9Hcy7NALIAJCvBtS0HUY0KACp8LKKO8Trw36v6ev0Wrns88BkWcMrvo0puv3RDzhfaP4mPToVQeCdJtbv0o001xCuqi0o"
                token={handleToken}
                billingAddress
                shippingAddress
                amount={amount * 100}
                
              />
            </div>
          </Container>
        </div>
      </Modal> */}
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
