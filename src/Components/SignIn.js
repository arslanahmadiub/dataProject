import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { login } from "../Services/authService";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState({
    userName: "",
    password: "",
  });

  let { userName, password } = data;

  let handelSignin = async (e) => {
    e.preventDefault();
    let authData = new FormData();
    authData.append("username", userName);
    authData.append("password", password);

    try {
      setErrorMessage(null);
      setLoading(true);

      let { data } = await login(authData);
      setLoading(false);

      if (data.status === 0) {
        history.push("/admin");
      } else if (data.status === 1) {
        setErrorMessage("Login Failed...");
      } else if (data.status === 2) {
        setErrorMessage("No user with this username exists...");
      } else if (data.status === 3) {
        setErrorMessage("Something went wrong or server error...");
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  let handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handelChange}
            label="User Name"
            name="userName"
            value={userName}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={handelChange}
            label="Password"
            value={password}
            type="password"
            id="password"
          />
          <Alert
            variant="filled"
            severity="error"
            style={{ display: errorMessage ? "flex" : "none" }}
          >
            {errorMessage && errorMessage}
          </Alert>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.submit}
            onClick={handelSignin}
            startIcon={
              <CircularProgress
                disableShrink
                style={{
                  color: "white",
                  width: "20px",
                  height: "20px",
                  display: loading ? "flex" : "none",
                }}
              />
            }
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
