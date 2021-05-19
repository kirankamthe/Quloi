import React from "react";
import Icon from "./Icon";
import "./styles.css";

export default function Tr({ sortedBy, sort, label }) {
  const SortUpIcon = ({ active, onClick }) => {
    return (
      <Icon active={active} onClick={onClick}>
        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"></path>
      </Icon>
    );
  };

  const SortDnIcon = ({ active, onClick }) => {
    return (
      <Icon active={active} onClick={onClick}>
        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"></path>
      </Icon>
    );
  };

  function changeSort(direction) {
    sort.changer((prev) => ({
      ...prev,
      sortedBy: {
        [sort.key]: direction,
      },
    }));
  }
  return (
    <th>
      <div
        className="flex-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="flex-full">{label}</div>
        {sort ? (
          <div>
            {sortedBy && sortedBy[sort.key] === "ascending" ? (
              <SortUpIcon
                active={sortedBy && sortedBy[sort.key] === "ascending"}
                onClick={() => changeSort("descending")}
              />
            ) : (
              <SortDnIcon
                active={sortedBy && sortedBy[sort.key] === "descending"}
                onClick={() => changeSort("ascending")}
              />
            )}
          </div>
        ) : null}
      </div>
    </th>
  );
}
