import Link from "next/link";
import React, { useState } from "react";
import classes from "./ProfileExpr.module.css";

const ProfileStartupForm = ({ your_startup, startups, linkStartupHandler }) => {
  return (
    <div className={classes.ProfileExpr}>
      <h1>Startup Profile</h1>
      <div className={classes.inputs}>
        {your_startup == null ? (
          <>
            <select
              style={{ width: "200px" }}
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => linkStartupHandler(e.target.value)}
            >
              <option selected value="">
                Select your startup
              </option>
              {startups.map((val) => {
                return (
                  <option key={val.startup_id} value={val.startup_id}>
                    {val.company_name}
                  </option>
                );
              })}
            </select>
            <h6 style={{ marginTop: "5px" }}>OR</h6>
            <Link href="/create-startup-profile">
              <a style={{ color: "blue" }}>create startup profile</a>
            </Link>
          </>
        ) : (
          <Link href="/">
            <a style={{ color: "blue" }}>{your_startup.company_name}</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileStartupForm;
