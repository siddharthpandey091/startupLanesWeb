import React, { useState } from "react";
import classes from "./ProfileExpr.module.css";

const ProfileContactForm = ({ email, mobile, updateContact }) => {
  const [useremail, setuseremail] = useState("");
  const [usermobile, setusermobile] = useState("");
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
    updateContact(useremail, usermobile);
    setEditMode(false);
    setShowBtn(false);
  };

  return (
    <div className={classes.ProfileExpr} style={{ marginTop: "-20px" }}>
      <h1>Contact</h1>
      <div className={classes.inputs}>
        <img src="/email.png" />
        {email == null ? (
          <input
            type="email"
            placeholder="email@company.com"
            onFocus={() => setShowBtn(true)}
            onChange={(e) => setuseremail(e.target.value)}
          />
        ) : (
          <p style={{ display: "inline" }}>{email}</p>
        )}
        <br />
        <br />
        <img src="/phone.png" />
        {mobile == null ? (
          <input
            type="text"
            placeholder="Phone no."
            onFocus={() => setShowBtn(true)}
            onChange={(e) => setusermobile(e.target.value)}
          />
        ) : (
          <p style={{ display: "inline" }}>{mobile}</p>
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

export default ProfileContactForm;
