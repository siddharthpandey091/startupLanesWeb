import React, { useState, useRef } from "react";
import classes from "./ProfileExpr.module.css";
import { FaEdit } from "react-icons/fa";

function ProfileExprForm({ expr, positions, handelSubmit, updateExpr }) {
  const [comp, setComp] = useState("");
  const [position, setPosition] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [addAnotherExpr, setAnotherExpr] = useState(false);
  const inputRef = useRef();

  const handleCancel = () => {
    setShowBtn(false);
    setAnotherExpr(false);
  };

  const setAddMore = () => {
    setAnotherExpr(true);
    if (addAnotherExpr) inputRef.current.focus();
    setShowBtn(true);
  };

  const handleAdd = (position, comp) => {
    handelSubmit(position, comp);
    setShowBtn(false);
    setAnotherExpr(false);
  };

  return (
    <div className={classes.ProfileExpr}>
      <h1>Experience</h1>
      <div className={classes.inputs}>
        <ul>
          {typeof expr == "undefined" || expr.length == 0 || addAnotherExpr ? (
            <li>
              <select
                style={{ width: "200px" }}
                className="form-select"
                onChange={(e) => setPosition(e.target.value)}
              >
                <option selected value="">
                  Select position
                </option>
                {positions.map((val) => {
                  return (
                    <option key={val.id} value={val.id}>
                      {val.position}
                    </option>
                  );
                })}
              </select>
              <br />
              <input
                placeholder="company name"
                onChange={(e) => setComp(e.target.value)}
                onFocus={() => setShowBtn(true)}
                ref={inputRef}
              />
              <br />
              {showBtn && (
                <div className="btngroup_profile">
                  <button
                    onClick={() => handleAdd(position, comp)}
                    className="btn btn-primary"
                  >
                    save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-outline-primary"
                  >
                    cancel
                  </button>
                </div>
              )}
            </li>
          ) : (
            expr.map((item) => {
              return (
                <li key={item.id}>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p>{item.position}</p>
                      <i>
                        <p style={{ marginTop: "-20px" }}>
                          {item.company_name}
                        </p>
                      </i>
                    </div>
                    <div style={{ cursor: "pointer", marginLeft: "50px" }}>
                      <FaEdit />
                    </div>
                  </div>
                </li>
              );
            })
          )}
          {!addAnotherExpr && (
            <li>
              <button className="btn btn-primary" onClick={setAddMore}>
                Add Another Experience
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileExprForm;
