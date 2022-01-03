import "../css/Register.css";
import { Button, Container, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "./NavBar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import { setToken, setUserId } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import { Person } from "@material-ui/icons";

export default function Register({ setUserId }: any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const classes = useStyles();
  let navigate = useNavigate();

  function createUser(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (firstName && lastName && password === passConfirm) {
      fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success === false) {
            alert(result.message);
          } else {
            setUserId(result.userId);
            navigate(`/dashboard/${result.userId}`);
          }
        })
        .catch(console.error);
    }
  }
  return (
    <div className="register-page-container">
      <div className="register-form-container">
        <Container>
          <form
            className="register-form"
            autoComplete="off"
            onSubmit={(event) => {
              createUser(event);
            }}
          >
            <TextField
              className="input-field"
              required
              id="standard-basic"
              label="First Name"
              size="small"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <TextField
              className="input-field"
              required
              id="standard-basic"
              label="Last Name"
              size="small"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <TextField
              className="input-field"
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
              required
              id="standard-basic"
              label="Password (7 characters)"
              size="small"
              type="password"
              inputProps={{ pattern: ".{7,}" }}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <TextField
              className="input-field"
              required
              id="standard-basic"
              label="Confirm password"
              size="small"
              type="password"
              onChange={(event) => {
                setPassConfirm(event.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              id="registerBtn"
            >
              Register with Cointrip!
            </Button>
          </form>

          <div>
            <p>Have an account?</p>
            <Link to="/login">
              <p>Sign In</p>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
