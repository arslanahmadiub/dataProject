import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { apiEndPoint } from "../../config.json";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const UploadCSV = () => {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [csvFile, setCsvFile] = useState(null);
  const [fileName, setfileName] = useState(null);
  const [showProgress, setshowProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  let uploadFileUrl = apiEndPoint + "uploadCSV";

  const classes = useStyles();

  let handelSelectFile = (e) => {
    setCsvFile(e.target.files[0]);

    setfileName(e.target.files[0].name);
  };
  let handelUpload = () => {
    let formData = new FormData();
    formData.append("file", csvFile);

    let options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent > 0) {
          setshowProgress(true);
          setProgress(percent);
          setBuffer(percent + 10);
        }
      },
    };

    axios
      .post(uploadFileUrl, formData, options)
      .then((res) => {
        setshowProgress(false);
        setSuccessMessage("Upload File Successfully..");
        setProgress(0);
        setBuffer(10);
        setfileName(null);
        setCsvFile(null);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage("Some thing wentwrong or server error...");
        setshowProgress(false);
        setProgress(0);
        setBuffer(10);
        setfileName(null);
        setCsvFile(null);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };
  return (
    <>
      <div
        className={classes.root}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <input
          accept=".csv"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handelSelectFile}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            style={{ background: "#25AAE1", color: "white" }}
          >
            Select File
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          component="span"
          style={{ background: "#25AAE1", color: "white" }}
          onClick={handelUpload}
        >
          Upload File
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3>{fileName && fileName}</h3>
      </div>
      <br />
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
      <LinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={buffer}
        style={{ display: showProgress ? "flex" : "none" }}
      />
    </>
  );
};

export default UploadCSV;
