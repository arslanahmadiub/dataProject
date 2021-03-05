import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { getAllUser } from "../../Services/authService";
import CircularProgress from "@material-ui/core/CircularProgress";
import { deleteUser } from "../../Services/authService";
import { updateUser } from "../../Services/authService";
import Alert from "@material-ui/lab/Alert";

const AllUser = () => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [state, setState] = useState({
    columns: [
      { title: "User Name", field: "username", editable: "never" },
      {
        title: "Password",
        field: "password",
        render: (rowData) => <p>{rowData.password.split("").map(() => "*")}</p>,
        editable: "onUpdate",
      },
      { title: "Company", field: "company", editable: "onUpdate" },
    ],
    data: [],
  });

  let getUsers = async () => {
    try {
      setShow(true);
      let { data } = await getAllUser();
      setShow(false);
      setState({ ...state, data: data.users });
    } catch (error) {
      console.log(error);
      setShow(false);
    }
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
      await deleteUser(deleteUserData);
    } catch (error) {}
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
        let { data } = await updateUser(updateData);

        if (data.status === 0) {
          setSuccessMessage("User update successfully...");
        } else if (data.status === 1) {
          setErrorMessage("No user with this username exists...");
        } else if (data.status === 2) {
          setErrorMessage("Something went wrong or server error...");
        }
      } catch (error) {
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
          <MaterialTable
            title="All User"
            options={{ actionsColumnIndex: -1 }}
            columns={state.columns}
            data={state.data}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  updateData(newData, oldData);

                  setTimeout(() => {
                    resolve();
                  }, 3000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    deleteData(oldData);

                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            display: show ? "flex" : "none",
          }}
        >
          <CircularProgress style={{ color: "#25AAE1" }} />
        </div>
      </div>
    </>
  );
};

export default AllUser;
