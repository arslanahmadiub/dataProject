import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createUser } from "../../Services/authService";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateUser = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [data, setData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    company: "",
  });
  let { userName, password, confirmPassword, company } = data;

  let handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let handelSignUp = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    let signUpData = new FormData();

    signUpData.append("username", userName);
    signUpData.append("password", password);
    signUpData.append("company", company);

    if (userName.length < 1 || password.length < 1 || company.length < 1) {
      setErrorMessage("Fill all fields...");
    } else if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters...");
    } else if (password !== confirmPassword) {
      setErrorMessage("Password don't match...");
    } else {
      try {
        setLoading(true);
        let { data } = await createUser(signUpData);
        setLoading(false);
        if (data.status === 0) {
          setSuccessMessage("User Created Successfully...");
          setData({
            userName: "",
            password: "",
            confirmPassword: "",
            company: "",
          });
        } else if (data.status === 1) {
          setErrorMessage("User Already Exists...");
        } else if (data.status === 2) {
          setErrorMessage("Something went wrong or server error...");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User Name"
            name="userName"
            value={userName}
            autoFocus
            onChange={handelChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            name="password"
            label="Password"
            type="password"
            onChange={handelChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handelChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="company"
            label="Company"
            type="text"
            value={company}
            onChange={handelChange}
          />
          <Alert
            variant="filled"
            severity="error"
            style={{ display: errorMessage ? "flex" : "none" }}
          >
            {errorMessage && errorMessage}
          </Alert>
          <Alert
            variant="filled"
            severity="success"
            style={{ display: successMessage ? "flex" : "none" }}
          >
            {successMessage && successMessage}
          </Alert>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.submit}
            onClick={handelSignUp}
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
            Create User
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateUser;
