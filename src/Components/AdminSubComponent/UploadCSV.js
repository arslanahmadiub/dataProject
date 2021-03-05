import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept=".csv"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Select File
        </Button>
      </label>
      <Button variant="contained" color="primary" component="span">
        Upload File
      </Button>
    </div>
  );
};

export default UploadCSV;
