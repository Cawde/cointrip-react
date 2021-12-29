import { Button, Container, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from './NavBar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const classes = useStyles();

  function createUser(event:React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (firstName && lastName && password === passConfirm) {
      fetch("https://fierce-sea-46269.herokuapp.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.message === "This email has already been used to register with Cointrip.") {
            alert("This email has already been used to register with Cointrip. Either sign in or enter another email please.");
          }
        })
        .catch(console.error);
    }
  }
  return(

    <div>
      <Container>
        <form autoComplete="off" onSubmit={(event) => {createUser(event)}}>
          <div>
            <TextField required id="standard-basic" label="First Name" size="small" onChange={(event) => {
              setFirstName(event.target.value);
            }}/>
          </div>
          <div>
            <TextField required id="standard-basic" label="Last Name" size="small" onChange={(event) => {
              setLastName(event.target.value);
            }}/>
          </div>
          <div>
            <TextField required id="standard-basic" label="Email" size="small" onChange={(event) => {
              setEmail(event.target.value);
            }}/>
          </div>
          <div>
            <TextField required id="standard-basic" label="Password (atleast 7 characters)" size="small" type="password"  inputProps={{pattern:".{7,}"}} onChange={(event) => {
              setPassword(event.target.value);
            }}/>
          </div>
          <div>
            <TextField required id="standard-basic" label="Retype Password" size="small" type="password" onChange={(event) => {
              setPassConfirm(event.target.value);
            }}/>
          </div>
          <Button type="submit" variant="contained" color="primary" className={classes.button}>Register with Cointrip!</Button>
        </form>
      </Container>
    </div>

  )

}