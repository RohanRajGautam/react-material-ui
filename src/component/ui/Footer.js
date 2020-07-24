import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  footer: { backgroundColor: theme.palette.common.blue, width: "100%" },

  privacy: { backgroundColor: theme.palette.common.darkBlue, padding: ".5em" },
  [theme.breakpoints.down("sm")]: { padding: "0.4em" },
  [theme.breakpoints.down("xs")]: { padding: "0.3em" },

  copyright: { fontSize: "1em", color: "white" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.8em" },
  [theme.breakpoints.down("xs")]: { fontSize: "0.7em" },

  logo: { width: "10em" },
  [theme.breakpoints.down("sm")]: { width: "8em" },
  [theme.breakpoints.down("xs")]: { width: "6em" },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid
        container
        justify='space-around'
        alignItems='center'
        className={classes.privacy}
      >
        <Grid item className={classes.copyright}>
          <p>Skilltransfers &copy; 2020</p>{" "}
        </Grid>
        <Grid item className={classes.logo}>
          <img src={logo} alt='logo' />
        </Grid>
      </Grid>
    </footer>
  );
}
