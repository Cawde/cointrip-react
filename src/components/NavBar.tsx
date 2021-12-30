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
    color: "white",
    backgroundColor: theme.palette.primary.main,
    marginTop: "5px",
  },
});

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className="navbar-container">
      <ul className="navbar">
        <li className="appname-icon-container">
          <Link to="/" className="app-name" style={{color: "white"}}>Coin trip</Link>
          <img src={icon} className="icon"/>
        </li>
        <li>
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
        </li>
      </ul>
    </div>
  );
}
