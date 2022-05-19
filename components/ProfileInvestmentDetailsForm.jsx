import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api";
import classes from "./ProfileExpr.module.css";
import { FaEdit } from "react-icons/fa";

const ProfileInvestmentDetailsForm = ({
  interested_amount,
  interested_industry,
  prev_investment,
  submitHandler,
}) => {
  const [amnt, setAmnt] = useState("");
  const [indtry, setIndtry] = useState("");
  const [prevInv, setPrevInv] = useState("");
  const [industries, setIndustries] = useState([]);
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
    submitHandler(amnt, indtry, prevInv);
    setEditMode(false);
    setShowBtn(false);
  };

  // get all industries
  useEffect(() => {
    axios
      .get(`${url}/get-industrytypes.php`)
      .then((res) => {
        setIndustries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.ProfileExpr}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
        <h1>Investment Details</h1>
        <div style={{ cursor: "pointer" }} onClick={handleEditMode}>
          <FaEdit />
        </div>
      </div>
      <div className={classes.inputs}>
        {(interested_amount == null &&
          interested_industry == null &&
          prev_investment == null) ||
        editMode ? (
          <>
            <label>Amount, you want to invest :</label>
            <br />
            <input
              type="text"
              placeholder="e.g. 1000000"
              defaultValue={interested_amount}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setAmnt(e.target.value)}
            />
            <br />
            <br />
            <label>Industry, in which you want to invest :</label>
            <br />
            <select
              style={{ width: "200px" }}
              className="form-select"
              onChange={(e) => setIndtry(e.target.value)}
            >
              <option selected value="">
                Select Industry
              </option>
              {industries.map((val) => {
                return (
                  <option key={val.id} value={val.id}>
                    {val.industry}
                  </option>
                );
              })}
            </select>
            <br />
            <label>Previous investment document URL :</label>
            <br />
            <input
              type="text"
              placeholder="paste the link"
              defaultValue={prev_investment}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setPrevInv(e.target.value)}
            />
          </>
        ) : (
          <>
            <label>Amount, you want to invest</label>
            <br />
            <div style={{ display: "inline" }}>
              {interested_amount ? (
                <p href={interested_amount}>{interested_amount}</p>
              ) : (
                `not provided`
              )}
            </div>
            <label> Interested Industry</label>
            <br />
            <div style={{ display: "inline" }}>
              {interested_industry ? (
                <p href={interested_industry}>{interested_industry}</p>
              ) : (
                `not provided`
              )}
            </div>
            <label>Previous investment</label>
            <br />
            <div style={{ display: "inline" }}>
              {prev_investment ? (
                <p href={prev_investment}>{prev_investment}</p>
              ) : (
                `not provided`
              )}
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

export default ProfileInvestmentDetailsForm;
