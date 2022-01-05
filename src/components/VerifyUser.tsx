import "../css/VerifyUser.css";
import { Button, Container, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEmailLS,
  getFirstNameLS,
  getLastNameLS,
  getUserIdLS,
} from "../auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function VerifyUser({
  customerUrl,
  setCustomerUrl,
  firstName,
  lastName,
  userId,
}: any) {
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [ssn, setSSN] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(true);
  const navigate = useNavigate();

  function createVerifiedCustomer(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    fetch(
      "https://fierce-sea-46269.herokuapp.com/api/transactions/create-customer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName || getFirstNameLS(),
          lastName: lastName || getLastNameLS(),
          email: email || getEmailLS(),
          address1,
          city,
          state,
          postalCode,
          dateOfBirth,
          ssn,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.name === "Success") {
          toast.success("Success!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCustomerUrl(result.customerUrl);
          setIsVerified(true);
          setIsFormComplete(true);
        } else {
          toast.error(result.message.body._embedded.errors[0].message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(console.error);
  }

  function editUser(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) {
    console.log("Url: ", customerUrl, "Email: ", email, "Password: ", password);
    event?.preventDefault();
    fetch(
      `https://fierce-sea-46269.herokuapp.com/api/users/${
        userId || getUserIdLS()
      }`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          customerUrl,
          isVerified: true,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/add-bank");
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (isVerified) {
      navigate("/add-bank");
    }
  });

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
            onSubmit={(event) => {
              createVerifiedCustomer(event);
            }}
          >
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
              className="input-field stateInitials"
              autoComplete="off"
              id="standard-basic"
              label="Enter State Initials"
              style={{ textTransform: "capitalize", fontWeight: "bold" }}
              inputProps={{ maxLength: 2 }}
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
              label="Enter date of birth (YYYY-MM-DD)"
              inputProps={{ maxLength: 10 }}
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
              color="secondary"
              id="loginBtn"
              disabled={isFormComplete}
              onClick={(event) => {
                editUser(event);
              }}
            >
              Next Step: Add Bank to send money
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
}
