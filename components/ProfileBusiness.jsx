import React from "react";
import classes from "./ProfileFunding.module.css";
import Link from "next/link";

function ProfileBusiness({
  founder,
  projection,
  cofounder,
  staffs,
  reg,
  doc_name,
  doc_url,
  startupIndia,
  looking_for_funding,
}) {
  return (
    <div className={classes.ProfileFunding}>
      <h4>Business Details</h4>
      <ul>
        <li>
          <div className={classes.Dflex}>
            <p>Founder </p>
            <span></span>
            <h6>{founder ? founder : "not provided"}</h6>
          </div>
        </li>
        <li>
          <div className={classes.Dflex}>
            <p>Establishment year </p>
            <span></span>
            <h6>{reg ? reg : "not provided"}</h6>
          </div>
        </li>
        <li>
          <div className={classes.Dflex}>
            <p>No. of employees </p>
            <span></span>
            <h6>{staffs ? staffs : "not provided"}</h6>
          </div>
        </li>
        <li>
          <div className={classes.Dflex}>
            <p>No. of CXOs </p>
            <span></span>
            <h6>{cofounder ? cofounder : "not provided"}</h6>
          </div>
        </li>
        <li>
          <div className={classes.Dflex}>
            <p>Projection </p>
            <span></span>
            <h6>{projection ? projection + " INR" : "not provided"}</h6>
          </div>
        </li>
        <li>
          <div className={classes.Dflex}>
            <p>Registered with Startup India </p>
            <span></span>
            <h6>{startupIndia ? startupIndia : "not provided"}</h6>
          </div>
        </li>
        <li>
          <div className={classes.Dflex}>
            <p>Looking for Funding </p>
            <span></span>
            <h6>
              {looking_for_funding ? looking_for_funding : "not provided"}
            </h6>
          </div>
        </li>
        <li>
          <div className={classes.Dflex}>
            <p>Pitch deck </p>
            <span></span>
            <div>
              {doc_name ? (
                <Link href="/">
                  <a>
                    <h6>
                      {doc_name}.pdf
                      {/* <img src={download} /> */}
                    </h6>
                  </a>
                </Link>
              ) : (
                <h6>not provided</h6>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProfileBusiness;
