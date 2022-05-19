import React from "react";
import Link from "next/link";
import classes from "./ProfileExpr.module.css";

function ProfileWeb({ website }) {
  return (
    <div
      className={classes.ProfileExpr}
      style={{ marginBottom: "100px", marginTop: "30px" }}
    >
      <h1>Other Links</h1>
      <div className={classes.inputs}>
        <img src="/web.svg" />
        {website != null ? (
          <Link href={website}>
            <a>
              <p style={{ display: "inline" }}>{website}</p>
            </a>
          </Link>
        ) : (
          <p>not provided</p>
        )}
      </div>
    </div>
  );
}

export default ProfileWeb;
