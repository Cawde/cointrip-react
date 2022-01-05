import { Button, Container, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserIdLS } from "../auth";

export default function VerifyUser({customerUrl, setCustomerUrl, firstName, lastName, userId}: any) {
  const [ address1, setAddress1 ] = useState("");
  const [ city, setCity ] = useState("");
  const [ state, setState ] = useState("");
  const [ postalCode, setPostalCode ] = useState("");
  const [ dateOfBirth, setDateOfBirth ] = useState("");
  const [ ssn, setSSN] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  
  function createVerifiedCustomer(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    fetch("http://localhost:5000/api/transactions/create-customer", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        address1,
        city,
        state,
        postalCode,
        dateOfBirth,
        ssn
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.name === "Success") {
          console.log("Testing success message");
          setCustomerUrl(result.customerUrl);
          setIsVerified(true);
        } else {
          alert(result.message.body._embedded.errors[0].message);
        }
      })
      .catch(console.error);
  }

    function editUser(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) {
      console.log("Url: ", customerUrl, "Email: ", email, "Password: ", password);
      event?.preventDefault();
      fetch(`http://localhost:5000/api/users/${userId || getUserIdLS()}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          customerUrl,
          isVerified: true
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          navigate('/add-bank')
        })
        .catch(console.error);
    }

  return (
    <div>
      <div className="edit-form-container">
        <Container className="material-container">
          <form
            className="verfiy-user-form"
            onSubmit={(event) => {
              createVerifiedCustomer(event);
            }}
          >
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
              label="Enter address"
              size="small"
              required
              onChange={(event) => {
                setAddress1(event.target.value);
              }}
            />
            <TextField
              className="input-field"
              autoComplete="off"
              id="standard-basic"
              label="Enter City"
              size="small"
              required
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <TextField
              className="input-field"
              autoComplete="off"
              id="standard-basic"
              label="Enter State"
              size="small"
              required
              onChange={(event) => {
                setState(event.target.value);
              }}
            />
            <TextField
              className="input-field"
              autoComplete="off"
              id="standard-basic"
              label="Enter postal code"
              size="small"
              required
              onChange={(event) => {
                setPostalCode(event.target.value);
              }}
            />
            <TextField
              className="input-field"
              autoComplete="off"
              id="standard-basic"
              label="Enter date of birth"
              size="small"
              required
              onChange={(event) => {
                setDateOfBirth(event.target.value);
              }}
            />
            <TextField
              className="input-field"
              autoComplete="off"
              id="standard-basic"
              label="Enter last 4 digits of SSN"
              size="small"
              required
              onChange={(event) => {
                setSSN(event.target.value);
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
            >
              Submit
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              id="loginBtn"
              disabled={isVerified}
              onClick={(event) => editUser(event)}
            >
              Add Bank to send money
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );

}