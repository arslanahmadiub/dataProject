import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { getUserData } from "../../Services/authService";

const UserPanel = () => {
  const [state, setState] = useState({
    columns: [
      { title: "איש_קשר", field: "איש_קשר", editable: "never" },
      { title: "גרסת_קושחה", field: "גרסת_קושחה", editable: "never" },
      { title: "גרסת_תוכנה", field: "גרסת_תוכנה", editable: "never" },
      { title: "הגדרות_תקשורת", field: "הגדרות_תקשורת", editable: "never" },
      { title: "טלפון_איש_קשר", field: "טלפון_איש_קשר", editable: "never" },
      { title: "כתובת_מלאה", field: "כתובת_מלאה", editable: "never" },
      { title: "מודל", field: "מודל", editable: "never" },
      { title: "מספר_מוטב", field: "מספר_מוטב", editable: "never" },
      { title: "מספר_מסוף", field: "מספר_מסוף", editable: "never" },
      { title: "מספר_סידורי", field: "מספר_סידורי", editable: "never" },
      { title: "מספר_עוסק", field: "מספר_עוסק", editable: "never" },
      {
        title: "מספר_עוסק_בסליקה",
        field: "מספר_עוסק_בסליקה",
        editable: "never",
      },
      { title: "מספר_קופה", field: "מספר_קופה", editable: "never" },
      { title: "משווק", field: "משווק", editable: "never" },
      { title: "סטטוס", field: "סטטוס", editable: "never" },
      { title: "סניף", field: "סניף", editable: "never" },
      {
        title: "קוד_איתחול_פינפד",
        field: "קוד_איתחול_פינפד",
        editable: "never",
      },
      { title: "רשת", field: "רשת", editable: "never" },
      { title: "שם_בית_העסק", field: "שם_בית_העסק", editable: "never" },
      { title: "שם_מכשיר", field: "שם_מכשיר", editable: "never" },
      {
        title: "תאריך_גישה_אחרונה_למערכת",
        field: "תאריך_גישה_אחרונה_למערכת",
        editable: "never",
      },
      { title: "תאריך_הקמה", field: "תאריך_הקמה", editable: "never" },
      { title: "תוכנה", field: "תוכנה", editable: "never" },
    ],
    data: [],
  });
  const [show, setShow] = useState(false);

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

      setState({ ...state, data: data.data });
    } catch (error) {
      setShow(false);
    }
  };

  useEffect(() => {
    dataGet();
  }, []);

  return (
    <div style={{ position: "relative", marginTop: "2%" }}>
      <div>
        <MaterialTable
          isLoading={show}
          title="User Data"
          localization={{
            body: {
              emptyDataSourceMessage: (
                <p
                  style={{
                    color: "green",
                    display: show ? "none" : "flex",
                  }}
                >
                  No records to display
                </p>
              ),
            },
          }}
          options={{ actionsColumnIndex: -1 }}
          columns={state.columns}
          data={state.data}
          id="allData"
        />
      </div>
    </div>
  );
};

export default UserPanel;
