import { Button, Container, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUserIdLS } from "../auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const dwolla = window.dwolla;
toast.configure();

declare global {
  interface Window {
    dwolla: any;
  }
}

export default function AddBank({
  fundingSource,
  setFundingSource,
  customerUrl,
  email,
  setEmail,
  password,
  setPassword,
}: any) {
  const [name, setName] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [token, setToken] = useState("");
  const [hasBank, setHasBank] = useState(false);
  const [toDashboard, setToDashbaord] = useState(true);
  let navigate = useNavigate();

  function editUser(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) {
    event?.preventDefault();
    fetch(`https://fierce-sea-46269.herokuapp.com/api/users/${getUserIdLS()}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        fundingSource,
        hasBank: true,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        navigate(`/dashboard/${getUserIdLS()}`);
      })
      .catch(console.error);
  }

  async function createVerifiedFundingSource() {
    fetch(
      "https://fierce-sea-46269.herokuapp.com/api/transactions/funding-source-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerUrl,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setToken(result.token);
      })
      .catch(console.error);
  }

  async function addBank(event: any) {
    event?.preventDefault();
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
        if (logValue.error === null) {
          console.log(logValue);
          setFundingSource(logValue.response._links["funding-source"].href);
          setHasBank(true);
          setToDashbaord(false);
          toast.success(res.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          console.log(err);
          toast.error(err.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
      <section className="information">
        <h3>
          Reasons to become Verfied<i>!</i>
        </h3>
        <ol>
          <li> Faster Service </li>
          <li> Send Money</li>
          <li> Receive Money</li>
          <li> Account Security</li>
        </ol>
      </section>
      <div className="mainForm">
        <Container className="material-container">
          <form
            className="verfiy-user-form"
            onSubmit={(event) => addBank(event)}
          >
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
          <Button
            className="cancelBtn"
            type="submit"
            variant="contained"
            color="primary"
            id="loginBtn"
            disabled={toDashboard}
            onClick={(event) => editUser(event)}
          >
            Go to dashboard
          </Button>
        </Container>
      </div>
    </div>
  );
}
