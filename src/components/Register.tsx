import "../css/Register.css";
import { Button, Container, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "./NavBar";
import {
  setUserEmailLS,
  setUserFirstNameLS,
  setUserIdLS,
  setUserLastNameLS,
} from "../auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Register({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  setUserId,
  email,
  setEmail,
  password,
  setPassword,
}: any) {
  const [passConfirm, setPassConfirm] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  function createUser(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (password !== passConfirm) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!firstName || !lastName) {
      toast.error("Please enter first and last name", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("https://fierce-sea-46269.herokuapp.com/api/users/register", {
      method: "POST",
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
          toast.error(result.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setUserId(result.userId);
          setUserIdLS(result.userId);
          setUserFirstNameLS(result.user.firstName);
          setUserLastNameLS(result.user.lastName);
          setUserEmailLS(result.user.email);
          setFirstName(result.user.firstName);
          setUserFirstNameLS(result.user.firstName);
          setUserLastNameLS(result.user.lastName);
          setLastName(result.user.lastName);
          navigate(`/verify-user`);
        }
      })
      .catch(console.error);
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
