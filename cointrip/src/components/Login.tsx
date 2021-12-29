import React, { useState } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import { useStyles } from './NavBar';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  function loginUser(event:React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    fetch("https://fierce-sea-46269.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success === false) {
          alert(result.message);
        } 
        // After log in, redirect to their dashboard
      })
      .catch(console.error);
  }

  return(
    <div>
      <Container>
        <form autoComplete="off" onSubmit={(event) => {loginUser(event)}}>
          <div>
            <TextField required id="standard-basic" label="Email" size="small" onChange={(event) => {
              setEmail(event.target.value);
            }}/>
          </div>
          <div>
            <TextField required id="standard-basic" label="Password" size="small" type="password"  inputProps={{pattern:".{7,}"}} onChange={(event) => {
              setPassword(event.target.value);
            }}/>
          </div>

          <Button type="submit" variant="contained" color="primary" className={classes.button}>Sign-in to Cointrip</Button>
        </form>
      </Container>
    </div>
  )

}