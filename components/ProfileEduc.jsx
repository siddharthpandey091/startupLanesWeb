import React from "react";
import classes from "./ProfileExpr.module.css";

function ProfileEduc({ educ }) {
  return (
    <div className={classes.ProfileEduc}>
      <h1>Last Education</h1>
      <div className={classes.inputs}>
        <ul>
          <li>
            {educ != null ? (
              <>
                <p>{educ.degree}</p>
                <br />
                <i>
                  <p>{educ.university}</p>
                </i>
              </>
            ) : (
              <p>No Education Found</p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileEduc;
