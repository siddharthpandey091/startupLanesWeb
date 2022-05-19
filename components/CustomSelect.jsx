import Select, { components } from "react-select";

function customSelect(props) {
  const icon = props.icon;
  var iconPlaceHolder = (
    <i
      className={`fas ${icon}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        marginLeft: "15px",
        marginTop: "18px",
        marginRight: "100px",
        color: "#0DA29E",
        fontSize: "16px",
      }}
    />
  );

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#eaeaea29",
      //    opacity: "0.2",
      // match with the menu
      borderRadius: state.isFocused ? "10px" : "10px",
      border: "1px solid #E6E6E6",
      paddingLeft: "30px",
      paddingRight: "20px",
      paddingTop: "7px",
      paddingBottom: "7px",
      // Overwrites the different states of b
      // Removes weird border around container
      boxShadow: state.isFocused
        ? "2px 4px 4px rgba(176, 176, 176, 0.25)"
        : null,
      "&:hover": {
        //  Overwrites the different states of border
        borderColor: state.isFocused ? null : "blue",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "#EAEAEA",
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base, state) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      background: "#000",
      borderRadius: state.isFocused ? "10px" : "10px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: "#fff",
      color: state.isFocused ? "blue" : "#1e1e1e",
      "&:hover": {
        backgroundColor: state.isFocused ? "#000" : "#fff",
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      svg: {
        fill: "#0DA29E",
      },
    }),
  };

  return (
    <div style={{ width: "300px" }}>
      {iconPlaceHolder}
      <Select
        styles={customStyles}
        options={props.options}
        placeholder={
          <div style={{ marginLeft: "39px", color: "#8D8D8D" }}>
            {props.placeholder}
          </div>
        }
        isSearchable={true}
        style={{ paddingLeft: "100px" }}
        value={props.options.filter(
          (option) => option.value === props.currentVal
        )}
        onChange={(e) => props.setCurrentVal(e.value)}
      />
    </div>
  );
}

export default customSelect;
