import React, { useState } from "react";
import MaterialTable from "material-table";

const AllData = () => {
  const [state, setState] = useState({
    columns: [
      { title: "Product Name", field: "pTitle", editable: "never" },
      { title: "Product Price", field: "pPrice", editable: "never" },
      { title: "Product Category", field: "pCategory", editable: "never" },
      {
        title: "Stock",
        field: "pStock",
        editable: "onUpdate",
        type: "numeric",
        cellStyle: {
          textAlign: "inherit",
          flexDirection: "row",
        },
        headerStyle: {
          textAlign: "inherit",
          flexDirection: "row",
        },
      },
    ],
    data: [],
  });

  let deleteData = async (oldData) => {};
  return (
    <MaterialTable
      title="All Data"
      options={{ actionsColumnIndex: -1 }}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            // setTimeout(() => {
            //   setData([...data, newData]);
            //   resolve();
            // }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            // setTimeout(() => {
            //   const dataUpdate = [...data];
            //   const index = oldData.tableData.id;
            //   dataUpdate[index] = newData;
            //   setData([...dataUpdate]);
            //   resolve();
            // }, 1000);
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
  );
};

export default AllData;
