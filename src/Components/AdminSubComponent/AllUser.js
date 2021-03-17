import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { getAllUser } from "../../Services/authService";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { deleteUser } from "../../Services/authService";
import { updateUser } from "../../Services/authService";
import Alert from "@material-ui/lab/Alert";
import { getCompanies } from "../../Services/authService";

import MenuItem from "@material-ui/core/MenuItem";

const AllUser = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#fff",
      },
      disabled: {
        main: "#fff",
      },
      action: {
        main: "#fff",
      },
      overrides: {
        MuiIconButton: {
          // Name of the component ⚛️ / style sheet
          root: {
            // Name of the rule
            color: "#fff", // Some CSS
          },
        },
      },
    },
  });

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [state, setState] = useState({
    columns: [
      {
        title: "User Name",
        field: "username",
        editable: "never",
        sorting: false,
      },
      {
        title: "Password",
        field: "password",
        render: (rowData) => <p>********</p>,
        editComponent: (props) => (
          <TextField
            type="password"
            fullWidth
            placeholder="New Password"
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
        sorting: false,
      },
      {
        title: "Company",
        field: "company",
        render: (rowData) => <p>{rowData.company}</p>,
        editComponent: (props) => (
          <>
            <InputLabel id="demo-simple-select-label">Company</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              onChange={(e) => props.onChange(e.target.value)}
            >
              {props.rowData.companyList.map((item, index) => {
                return (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </>
        ),
        // editable: "onUpdate",
        sorting: false,
      },
    ],
    data: [],
  });

  let getUsers = async () => {
    try {
      let { data } = await getCompanies();

      let companyList = data.companies;
      if (data.status === 0) {
        try {
          setShow(true);
          let { data } = await getAllUser();

          let newUsers = [];

          data.users.map((item, index) => {
            let dataObject = {
              username: item.username,
              password: item.password,
              company: item.company,
              companyList: companyList,
            };
            newUsers.push(dataObject);
          });

          setShow(false);
          setState({ ...state, data: newUsers });
        } catch (error) {
          setShow(false);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  let deleteData = async (oldData) => {
    let deleteUserData = new FormData();
    deleteUserData.append("username", oldData.username);
    deleteUserData.append("password", oldData.password);
    deleteUserData.append("company", oldData.company);

    try {
      setShow(true);

      await deleteUser(deleteUserData);
      setShow(false);
    } catch (error) {
      setShow(false);
    }
  };

  let updateData = async (newData, old) => {
    if (newData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters...");
    } else {
      let index = old.tableData.id;
      let oldData = [...state.data];
      oldData[index] = newData;
      setState({ ...state, data: oldData });

      let updateData = new FormData();

      updateData.append("username", newData.username);
      updateData.append("password", newData.password);
      updateData.append("company", newData.company);

      try {
        setShow(true);
        let { data } = await updateUser(updateData);
        setShow(false);

        if (data.status === 0) {
          setSuccessMessage("User update successfully...");
        } else if (data.status === 1) {
          setErrorMessage("No user with this username exists...");
        } else if (data.status === 2) {
          setErrorMessage("Something went wrong or server error...");
        }
      } catch (error) {
        setShow(false);
        setErrorMessage("Something went wrong or server error...");
      }
    }

    setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <>
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
      <div style={{ position: "relative", marginTop: "2%" }}>
        <div>
          <ThemeProvider theme={theme}>
            <MaterialTable
              style={{
                background: "#0f458d",
                color: "white",
              }}
              isLoading={show}
              title=""
              id="allUser"
              localization={{
                body: {
                  emptyDataSourceMessage: (
                    <p
                      style={{
                        color: "#0f458d",
                        display: show ? "none" : "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      No records to display
                    </p>
                  ),
                },
              }}
              options={{
                actionsColumnIndex: -1,
                sortable: false,
                searchFieldAlignment: "left",

                headerStyle: {
                  backgroundColor: "#0f458d",
                  color: "white",
                  whiteSpace: "nowrap",
                },
                rowStyle: {
                  whiteSpace: "nowrap",
                },
                searchFieldStyle: {
                  color: "white",
                  buttonColor: "red",
                },
              }}
              columns={state.columns}
              data={state.data}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    resolve();
                    updateData(newData, oldData);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    resolve();
                    deleteData(oldData);

                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }),
              }}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default AllUser;
