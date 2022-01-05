import "../css/Login.css";
import { Button, Container, TextField } from "@material-ui/core";
import { useStyles } from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { setUserIdLS, setUserFirstNameLS, setUserLastNameLS } from "../auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Login({
  setFundingSource,
  setUserId,
  setFirstName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
}: any) {
  const classes = useStyles();
  const navigate = useNavigate();

  function loginUser(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    fetch("https://fierce-sea-46269.herokuapp.com/api/users/login", {
      method: "POST",
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
          toast.success(`Thank you for logging in, here's your dashboard!`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(result);
          setUserId(result.userId);
          setUserIdLS(result.userId);
          setFirstName(result.user.firstName);
          setUserFirstNameLS(result.user.firstName);
          setUserLastNameLS(result.user.lastName);
          setLastName(result.user.lastName);
          setFundingSource(result.user.fundingSource);
          navigate(`/dashboard/${result.userId}`);

          //The code below is for future development. I will add these two checks so the user can add bank information and be verified before reaching their dashboard
          // if (!result.user.isVerified) {
          //   navigate('/verify-user')
          // } else if (result.user.isVerified && !result.user.hasBank) {
          //   navigate('/add-bank')
          // } else {
          //   navigate(`/dashboard/${result.userId}`);
          // }
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
