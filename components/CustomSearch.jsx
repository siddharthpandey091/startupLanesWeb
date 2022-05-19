import React, { useState } from "react";
import classes from "./CustomSearch.module.css";

function CustomSearchbar({ placeholder, data, clickHandler }) {
  const [filteredData, setFilteredData] = useState([]);
  function handleFilter(e) {
    const searchTerm = e.target.value;
    const newFilter = data.filter((value) => {
      return value.sub_category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  return (
    <div className={classes.CustomSearchbar}>
      <img src="/search.svg" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleFilter}
      />{" "}
      <br />
      {filteredData.length != 0 && (
        <div className={classes.dataRes}>
          {filteredData.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => clickHandler(item.category, item.id)}
              >
                {item.sub_category}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomSearchbar;
