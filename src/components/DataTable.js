import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles.css";
import Tr from "./Tr";

function DataTable({
  user,
  items,
  handleSortData,
  handleRowClick,
  handleEditClick,
}) {
  const [state, setState] = useState({
    sortedBy: { name: "ascending" },
  });

  useEffect(() => {
    if (!state.sortedBy) return;
    const sortKey = Object.keys(state.sortedBy)[0];
    const direction = state.sortedBy[sortKey];
    handleSortData(direction, sortKey);
  }, [state.sortedBy]);

  const tableBody = (key, value) => {
    // let tableData = value ? value : items;
    return (
      <tbody>
        {items.map((row, i) => {
          let TextClass = row.currentState == "Completed" ? "completed-cl" : "";
          return (
            <>
              {i == 0 && key ? (
                <tr>
                  <td>{key}</td>
                </tr>
              ) : null}
              <tr>
                <td className={TextClass}>{row.name}</td>
                <td className={TextClass}>{row.gender}</td>
                <td className={TextClass}>{row.class}</td>
                <td className={TextClass}>{row.birthDate}</td>
                <td className={TextClass}>{row.emailId}</td>
                <td className={TextClass}>{row.contactNo}</td>
                <td className={TextClass}>
                  {row.street +
                    ", " +
                    row.city +
                    " " +
                    row.state +
                    " " +
                    row.country +
                    " " +
                    row.zipcode}
                </td>
                <td>
                  <div style={{ display: "flex" }}>
                    {user?.isAdmin && (
                      <Button onClick={() => handleEditClick(row)} style={{ margin: "0em 0.3em" }}>Edit</Button>
                    )}

                    <Button
                      variant="success"
                      onClick={() => handleRowClick(row)}
                      style={{ margin: "0em 0.3em" }}
                    >
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    );
  };

  return (
    <table className="__dml_table" cellSpacing={0} cellPadding={0}>
      <thead>
        <tr>
          <Tr
            label="Name"
            sortedBy={state.sortedBy}
            sort={{ key: "name", changer: setState }}
          />
          <Tr
            label="Gender"
            sortedBy={state.sortedBy}
            sort={{ key: "gender", changer: setState }}
          />
          <Tr
            label="Class"
            sortedBy={state.sortedBy}
            sort={{ key: "classs", changer: setState }}
          />
          <Tr
            label="BirthDate"
            sortedBy={state.sortedBy}
            sort={{ key: "birthDate", changer: setState }}
          />
          <Tr
            label="Email Id"
            sortedBy={state.sortedBy}
            sort={{ key: "emailId", changer: setState }}
          />
          <Tr
            label="Contact No"
            sortedBy={state.sortedBy}
            sort={{ key: "contactNo", changer: setState }}
          />
          <Tr label="Address" />
          <Tr label="Actions" />
        </tr>
      </thead>
      {tableBody()}
    </table>
  );
}

export default DataTable;
