import { Button } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";

export const useStyles = makeStyles({
  button: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    marginTop: "5px"
  },
});

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className="navbar-container">
      <ul className="navbar">
      <li>
          <Link to="/">
            Coin trip
          </Link>
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
