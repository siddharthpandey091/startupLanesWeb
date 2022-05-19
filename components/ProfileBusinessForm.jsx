import React, { useEffect, useState } from "react";
import classes from "./ProfileExpr.module.css";
import { FaEdit } from "react-icons/fa";

const ProfileBusinessForm = ({
  founder,
  projection,
  cofounder,
  staffs,
  reg,
  doc_name,
  startupIndia,
  looking_for_funding,
  submitHandler,
}) => {
  const [founderState, setFounderState] = useState("");
  const [projectionState, setProjectionState] = useState("");
  const [cofounderState, setCofounderState] = useState("");
  const [staffsState, setStaffsState] = useState("");
  const [regState, setRegState] = useState("");
  const [docState, setDocState] = useState("");
  const [startupIndState, setStartupIndState] = useState("0");
  const [fundingState, setFundingState] = useState("0");

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

  const handelSubmit = () => {
    submitHandler(
      founderState,
      projectionState,
      cofounderState,
      staffsState,
      regState,
      docState,
      startupIndState,
      fundingState
    );
    setEditMode(false);
    setShowBtn(false);
  };

  return (
    <div className={classes.ProfileExpr}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
        <h1>Business Details</h1>
        <div style={{ cursor: "pointer" }} onClick={handleEditMode}>
          <FaEdit />
        </div>
      </div>
      <div className={classes.inputs}>
        {(founder == null &&
          staffs == null &&
          projection == null &&
          reg == null &&
          doc_name == null &&
          startupIndia == null &&
          looking_for_funding == null &&
          // industry_name == null &&
          cofounder == null) ||
        editMode ? (
          <>
            <label>Founder Name:</label>
            <br />
            <input
              type="text"
              placeholder="Founder name"
              defaultValue={founder}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setFounderState(e.target.value)}
            />
            <br />
            <br />

            <label>Establishment year:</label>
            <br />
            <input
              type="date"
              placeholder="e.g. 1000000"
              defaultValue={reg}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setRegState(e.target.value)}
            />
            <br />
            <br />

            <label>No. of employees:</label>
            <br />
            <input
              type="number"
              placeholder="e.g. 100"
              defaultValue={staffs}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setStaffsState(e.target.value)}
            />
            <br />
            <br />

            <label>No. of CXOs:</label>
            <br />
            <input
              type="number"
              placeholder="e.g. 10"
              defaultValue={cofounder}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setCofounderState(e.target.value)}
            />
            <br />
            <br />

            <label>Projection:</label>
            <br />
            <input
              type="number"
              placeholder="e.g. 1000000 INR"
              defaultValue={projection}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setProjectionState(e.target.value)}
            />
            <br />
            <br />

            <label>Registered with Startup India?:</label>
            <br />
            <select
              style={{ width: "200px" }}
              className="form-select"
              onChange={(e) => setStartupIndState(e.target.value)}
            >
              <option selected value="0">
                NO
              </option>
              <option value="1">YES</option>
            </select>
            <br />

            <label>Looking for Funding?:</label>
            <br />
            <select
              style={{ width: "200px" }}
              className="form-select"
              onChange={(e) => setFundingState(e.target.value)}
            >
              <option selected value="0">
                NO
              </option>
              <option value="1">YES</option>
            </select>
            <br />

            <label>Pitch deck:</label>
            <br />
            <input
              type="text"
              placeholder="paste drive link"
              defaultValue={doc_name}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setDocState(e.target.value)}
            />
          </>
        ) : (
          <>
            <label>Founder</label>
            <br />
            <div style={{ display: "inline" }}>
              <p>{founder ? founder : "not provided"}</p>
            </div>

            <label> Establishment year</label>
            <br />
            <div style={{ display: "inline" }}>
              <p>{reg ? reg : "not provided"}</p>
            </div>

            <label>No. of employees</label>
            <br />
            <div style={{ display: "inline" }}>
              <p>{staffs ? staffs : "not provided"}</p>
            </div>

            <label>No. of CXOs</label>
            <br />
            <div style={{ display: "inline" }}>
              <p>{cofounder ? cofounder : "not provided"}</p>
            </div>

            <label>Pitch deck</label>
            <br />
            <div style={{ display: "inline" }}>
              {doc_name ? (
                <>
                  <a href={doc_name}>{doc_name}</a> <br /> <br />
                </>
              ) : (
                <p>not provided</p>
              )}
            </div>

            <label>Registered with Startup India</label>
            <br />
            <div style={{ display: "inline" }}>
              <p>
                {startupIndia
                  ? startupIndia == 1
                    ? "YES"
                    : "NO"
                  : "not provided"}
              </p>
            </div>

            <label>Looking for Funding</label>
            <br />
            <div style={{ display: "inline" }}>
              <p>
                {looking_for_funding
                  ? looking_for_funding == 1
                    ? "YES"
                    : "NO"
                  : "not provided"}
              </p>
            </div>

            <label>Projection</label>
            <br />
            <div style={{ display: "inline" }}>
              <p>{projection ? projection + " INR" : "not provided"}</p>
            </div>
          </>
        )}
      </div>
      {showBtn && (
        <div className="btngroup_profile">
          <button onClick={handelSubmit} className="btn btn-primary">
            save
          </button>
          <button onClick={handleCancel} className="btn btn-outline-primary">
            cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBusinessForm;
