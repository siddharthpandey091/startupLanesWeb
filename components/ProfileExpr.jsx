import React from "react";
import classes from "./ProfileExpr.module.css";

function ProfileExpr({ expr }) {
  return (
    <div className={classes.ProfileExpr}>
      <h1>Experience</h1>
      <div className={classes.inputs}>
        <ul>
          {typeof expr != "undefined" && expr.length != 0 ? (
            expr.map((item) => {
              return (
                <li key={item.id}>
                  <p>{item.position}</p>
                  <br />
                  <i>
                    <p>{item.company_name}</p>
                  </i>
                </li>
              );
            })
          ) : (
            <li>
              <p>No Experience</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileExpr;
