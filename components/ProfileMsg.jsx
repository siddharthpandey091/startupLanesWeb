import React from "react";
import classes from "./ProfileMssg.module.css";

function ProfileMsg({ msg }) {
  return (
    <div className={classes.ProfileMssg}>
      <p>{msg ? msg : "no bio provided yet"}</p>
    </div>
  );
}

export default ProfileMsg;
