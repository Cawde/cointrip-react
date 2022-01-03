import "../css/Login.css";
import React, { useState } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import { useStyles } from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { Person } from "@material-ui/icons";

export default function Login({setUserId, email, setEmail}: any) {
  
  const [password, setPassword] = useState("");
  const classes = useStyles();
  let navigate = useNavigate();

  function loginUser(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
        // After log in, redirect to their dashboard
      })
      .catch(console.error);
  }

  return (
      <div className="login-page-container">
        <div className="login-form-container">
          <Container>
            <form
              className="login-form"
              autoComplete="off"
              onSubmit={(event) => {
                loginUser(event);
              }}
            >
              <TextField
                required
                className="input-field"
                id="standard-basic"
                label="Email"
                size="small"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                required
                className="input-field"
                id="standard-basic"
                label="Password"
                size="small"
                type="password"
                inputProps={{ pattern: ".{7,}" }}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                id="loginBtn"
                className={classes.button}
              >
                Sign-in to Cointrip
              </Button>
            </form>
            <div>
              <p>Don't have an account?</p>
              <Link to="/register">
                <p>Register here</p>
              </Link>
            </div>
          </Container>
        </div>
      </div>
  );
}
