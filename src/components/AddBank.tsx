import { Button, Container, Modal, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUserIdLS } from "../auth";
import { useNavigate } from "react-router-dom";
const dwolla = window.dwolla;

declare global {
  interface Window {
    dwolla: any;
  }
}

export default function AddBank({ customerUrl, email, setEmail, password, setPassword }: any) {
  const [name, setName] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [token, setToken] = useState("");
  const [fundingSource, setFundingSource] = useState("");
  let navigate = useNavigate();

  function editUser(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) {
    event?.preventDefault();
    console.log("fundingSourceUrl: ", fundingSource, "Email: ", email, "Password: ", password);
    fetch(`http://localhost:5000/api/users/${getUserIdLS()}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        fundingSource
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate(`/dashboard/${getUserIdLS()}`);

      })
      .catch(console.error);
  }

  async function createVerifiedFundingSource() {
    console.log(customerUrl);
    fetch("http://localhost:5000/api/transactions/funding-source-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerUrl,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setToken(result.token);
      })
      .catch(console.error);
  }

  async function addBank(event: any) {
    event?.preventDefault();
    console.log(token);
    dwolla.configure("sandbox");
    dwolla.fundingSources.create(
      token,
      {
        routingNumber,
        accountNumber,
        type: "Checking",
        name,
      },
      function callback(err: any, res: any) {
        const logValue = {
          error: err,
          response: res,
        };
        console.log(logValue);
        if (logValue.error === null) {
          console.log(logValue.response._links["funding-source"].href);
          setFundingSource(logValue.response._links["funding-source"].href)
        }
      }
    );

    return false;
  }

  useEffect(() => {
    createVerifiedFundingSource();
    const script = document.createElement("script");
    script.src = "https://cdn.dwolla.com/1/dwolla.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="edit-form-container">
      <Container className="material-container">
        <form className="verfiy-user-form">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="loginBtn"
            onClick={(event) => editUser(event)}
          >
            Return to dashboard
          </Button>
        </form>
      </Container>
      <Container className="material-container">
        <form className="verfiy-user-form" onSubmit={(event) => addBank(event)}>
          <TextField
            className="input-field"
            autoComplete="off"
            id="standard-basic"
            label="Enter Bank Name"
            size="small"
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            className="input-field"
            autoComplete="off"
            id="standard-basic"
            label="Enter Routing Number"
            size="small"
            required
            onChange={(event) => {
              setRoutingNumber(event.target.value);
            }}
          />
          <TextField
            className="input-field"
            autoComplete="off"
            id="standard-basic"
            label="Enter Account Number"
            size="small"
            required
            onChange={(event) => {
              setAccountNumber(event.target.value);
            }}
          />
          <TextField
            className="input-field"
            autoComplete="off"
            id="standard-basic"
            label="Enter email"
            size="small"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <TextField
            className="input-field"
            autoComplete="off"
            id="standard-basic"
            label="Enter password"
            size="small"
            type="password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="loginBtn"
            onClick={(event) => addBank(event)}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}
