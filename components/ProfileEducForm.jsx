import React, { useState, useRef } from "react";
import classes from "./ProfileExpr.module.css";
import { FaEdit } from "react-icons/fa";

function ProfileEducForm({ educ, degrees, handelSubmit }) {
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleCancel = () => {
    setShowBtn(false);
    setEditMode(false);
  };

  const handleEditMode = () => {
    setShowBtn(true);
    setEditMode(true);
  };

  const addeduc = () => {
    handelSubmit(degree, university);
    setEditMode(false);
    setShowBtn(false);
  };

  return (
    <div className={classes.ProfileEduc}>
      <h1>Last Education</h1>
      <div className={classes.inputs}>
        <ul>
          {educ == null || editMode ? (
            <li>
              <select
                style={{ width: "200px" }}
                className="form-select"
                onChange={(e) => setDegree(e.target.value)}
              >
                <option selected value="">
                  Select Degree
                </option>
                {degrees.map((val) => {
                  return (
                    <option key={val.id} value={val.id}>
                      {val.degree}
                    </option>
                  );
                })}
              </select>
              <br />
              <input
                placeholder="company name"
                onChange={(e) => setUniversity(e.target.value)}
                onFocus={() => setShowBtn(true)}
                defaultValue={educ?.university}
              />
              <br />
              {showBtn && (
                <div className="btngroup_profile">
                  <button onClick={addeduc} className="btn btn-primary">
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
            <li>
              <div style={{ display: "flex" }}>
                <div>
                  <p>{educ.degree}</p>
                  <i>
                    <p style={{ marginTop: "-20px" }}>{educ.university}</p>
                  </i>
                </div>
                <div
                  style={{ cursor: "pointer", marginLeft: "50px" }}
                  onClick={handleEditMode}
                >
                  <FaEdit />
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileEducForm;
