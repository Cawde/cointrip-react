import "../css/NavBar.css";
import { Button } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";
const icon = require("../assets/logo2.png");


export const useStyles = makeStyles({
  button: {
    color: "black",
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: "white",
    marginTop: "5px",
  },
});

export default function NavBar({userId}: any) {
  const classes = useStyles();
  return (
    <div className="navbar-container">
      <ul className="navbar">
        <li className="appname-icon-container">
          <Link to="/" className="app-name" style={{ color: "white" }}>
            Coin trip
          </Link>
          <img src={icon} className="icon" />
        </li>
        <li>
          {userId ? (
            <Link to={`/dashboard/${userId}`}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Person />}
                className={classes.button}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Person />}
                className={classes.button}
              >
                Sign In
              </Button>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
