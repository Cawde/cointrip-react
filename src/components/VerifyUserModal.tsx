import { Button, Container, Modal, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { getUserIdLS, setUserIdLS } from "../auth";

export default function VerifyUserModal({openVUM, setOpenVUM, firstName, lastName, userId}: any) {
  const [ address1, setAddress1 ] = useState("");
  const [ city, setCity ] = useState("");
  const [ state, setState ] = useState("");
  const [ postalCode, setPostalCode ] = useState("");
  const [ dateOfBirth, setDateOfBirth ] = useState("");
  const [ ssn, setSSN] = useState("");
  const [ email, setEmail ] = useState("");
  const [ customerUrl, setCustomerUrl ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ openUpdate, setOpenUpdate ] = useState(false);
  
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
        } else {
          alert(result.message.body._embedded.errors[0].message);
        }
        setOpenVUM(false);
        setOpenUpdate(true);
      })
      .catch(console.error);
  }

    function editUser(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) {
      console.log("Url: ", customerUrl, "Email: ", email, "Password: ", password);
      event?.preventDefault();
      fetch(`http://localhost:5000/api/users/${getUserIdLS()}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          customerUrl
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setOpenUpdate(false);
        })
        .catch(console.error);
    }

  return (
    <div>
      <Modal open={openUpdate}>
        <Container className="material-container">
          <form className="verfiy-user-form">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="loginBtn"
            onClick={(event) => editUser(event)}
          >Return to dashboard</Button>
          </form>
        </Container>
      </Modal>
      <Modal open={openVUM} className="edit-modal-container">
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
                label="Enter Date of birth"
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
                label="Enter last 4 of SSN"
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
                color="secondary"
                id="loginBtn"
                onClick={() => setOpenVUM(false)}
              >
                Close
              </Button>
            </form>
          </Container>
        </div>
      </Modal>
    </div>
  );

}