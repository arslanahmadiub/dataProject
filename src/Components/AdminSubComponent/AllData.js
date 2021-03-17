import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { getAllData } from "../../Services/authService";
import { saveAllData } from "../../action/authAction";
import { setDbTime } from "../../action/authAction";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import moment from "moment";
const AllData = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    columns: [
      {
        title: "תוכנה",
        field: "תוכנה",
        editable: "never",
      },
      {
        title: "תאריך גישה אחרונה למערכת",
        field: "תאריך גישה אחרונה למערכת",
        editable: "never",
      },
      {
        title: "שם מכשיר",
        field: "שם מכשיר",
        editable: "never",
      },
      {
        title: "שם בית העסק",
        field: "שם בית העסק",
        editable: "never",
      },
      {
        title: "רשת",
        field: "רשת",
        editable: "never",
      },
      {
        title: "קוד איתחול פינפד",
        field: "קוד איתחול פינפד",
        editable: "never",
      },
      {
        title: "סניף",
        field: "סניף",
        editable: "never",
      },
      {
        title: "סטטוס",
        field: "סטטוס",
        editable: "never",
      },
      {
        title: "משווק",
        field: "משווק",
        editable: "never",
      },
      {
        title: "מספר קופה",
        field: "מספר קופה",
        editable: "never",
      },
      {
        title: "מספר עוסק בסליקה",
        field: "מספר עוסק בסליקה",
        editable: "never",
      },
      {
        title: "מספר עוסק",
        field: "מספר עוסק",
        editable: "never",
      },
      {
        title: "מספר סידורי",
        field: "מספר סידורי",
        editable: "never",
      },
      {
        title: "מספר מסוף",
        field: "מספר מסוף",
        editable: "never",
      },
      {
        title: "מודל",
        field: "מודל",
        editable: "never",
      },
      {
        title: "הגדרות תקשורת",
        field: "הגדרות תקשורת",
        editable: "never",
      },
    ],
    data: [],
  });
  const [show, setShow] = useState(false);

  const fullData = useSelector((state) => state.allData.allData);
  const dbTime = useSelector((state) => state.allData.dbTime);

  useEffect(() => {
    setState({ ...state, data: fullData });
  }, [fullData]);

  let dataGet = async () => {
    try {
      setShow(true);
      let { data } = await getAllData();

      let dbTimes = moment(data.timestamp).format("MMMM Do YYYY, h:mm:ss a");

      dispatch(setDbTime(dbTimes));
      dispatch(saveAllData(data.data));
      setShow(false);
    } catch (error) {
      setShow(false);
    }
  };

  let handelRefresh = () => {
    dataGet();
  };

  useEffect(() => {
    if (fullData.length < 1) {
      dataGet();
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          style={{ background: "#0f458d", color: "white" }}
          onClick={handelRefresh}
        >
          Refresh
        </Button>
        <h5 style={{ marginLeft: "10px", color: "#0F458D" }}>
          Last DB Updated Time: {dbTime && dbTime}
        </h5>
      </div>

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

export default AllData;
