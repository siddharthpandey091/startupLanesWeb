import React from "react";
import Link from "next/link";
import classes from "./ProfileFunding.module.css";

const ProfileInvestment = ({ ind, amnt, doc_name, doc_url }) => {
  return (
    <div className={classes.ProfileFunding}>
      <h4>Investment Details</h4>
      <ul>
        <li>
          <div className={classes.Dflex}>
            <p>Prefered industries to invest </p>
            <span></span>
            <h6>{ind ? ind : "not provided"}</h6>
          </div>
        </li>
        <li>
          <div className={classes.Dflex}>
            <p>Amount to invest</p>
            <span></span>
            <h6>{amnt ? amnt : "not provided"}</h6>
          </div>
        </li>
        <li>
          <div className={classes.Dflex}>
            <p>Investment in past </p>
            <span></span>
            <div>
              {doc_name ? (
                <Link href={doc_url}>
                  <h6>{doc_name}</h6>
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
};

export default ProfileInvestment;
