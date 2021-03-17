import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { getUserData } from "../../Services/authService";
import { useSelector, useDispatch } from "react-redux";
import { setUserDbTime } from "../../action/authAction";

const UserPanel = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    columns: [
      { title: "תוכנה", field: "תוכנה", editable: "never" },
      {
        title: "תאריך גישה אחרונה למערכת",
        field: "תאריך גישה אחרונה למערכת",
        editable: "never",
      },
      { title: "שם מכשיר", field: "שם מכשיר", editable: "never" },
      { title: "שם בית העסק", field: "שם בית העסק", editable: "never" },
      { title: "רשת", field: "רשת", editable: "never" },
      {
        title: "קוד איתחול פינפד",
        field: "קוד איתחול פינפד",
        editable: "never",
      },
      { title: "סניף", field: "סניף", editable: "never" },
      { title: "סטטוס", field: "סטטוס", editable: "never" },
      { title: "משווק", field: "משווק", editable: "never" },
      { title: "מספר קופה", field: "מספר קופה", editable: "never" },
      {
        title: "מספר עוסק בסליקה",
        field: "מספר עוסק בסליקה",
        editable: "never",
      },
      { title: "מספר עוסק", field: "מספר עוסק", editable: "never" },
      { title: "מספר סידורי", field: "מספר סידורי", editable: "never" },
      { title: "מספר מסוף", field: "מספר מסוף", editable: "never" },
      { title: "מודל", field: "מודל", editable: "never" },
      { title: "הגדרות תקשורת", field: "הגדרות תקשורת", editable: "never" },
    ],
    data: [],
  });
  const [show, setShow] = useState(false);
  const userDbTime = useSelector((state) => state.allData.userDbTime);

  let dataGet = async () => {
    try {
      setShow(true);
      let storageData = sessionStorage.getItem("userData");
      let finalData = JSON.parse(storageData);
      let formData = new FormData();
      formData.append("username", finalData.username);
      formData.append("password", finalData.password);
      formData.append("company", finalData.company);
      let { data } = await getUserData(formData);
      setShow(false);
      dispatch(setUserDbTime(data.timestamp));
      setState({ ...state, data: data.data });
    } catch (error) {
      setShow(false);
    }
  };

  useEffect(() => {
    dataGet();
  }, []);

  return (
    <>
      <h5 style={{ marginLeft: "10px", color: "#0F458D" }}>
        Last DB Updated Time: {userDbTime && userDbTime}
      </h5>
      <MaterialTable
        title=""
        isLoading={show}
        style={{
          background: "#0f458d",
          color: "white",
          marginTop: "50px",
        }}
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
          searchFieldAlignment: "left",
          pageSizeOptions: [50, 100, 200, 500],
          pageSize: 50,
          sortable: false,
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
          },
        }}
        columns={state.columns}
        data={state.data}
      />
    </>
  );
};

export default UserPanel;
