import React from "react";
import classes from "./ProfileExpr.module.css";

function ProfileContact({ email, mobile }) {
  return (
    <div className={classes.ProfileExpr}>
      <h1>Contact</h1>
      <div className={classes.inputs}>
        <img src="/email.png" />
        <p style={{ display: "inline" }}>{email ? email : "not provided"}</p>
        <br />
        <img src="/phone.png" />
        <p style={{ display: "inline" }}>{mobile ? mobile : "not provided"}</p>
      </div>
    </div>
  );
}

export default ProfileContact;
