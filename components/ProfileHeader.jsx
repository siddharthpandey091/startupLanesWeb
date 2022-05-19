import React, { useState, useEffect } from "react";
import Link from "next/link";
import classes from "./ProfileHeader.module.css";

function ProfileHeader({
  cover,
  profile,
  name,
  type,
  city,
  state,
  country,
  zipcode,
  linkedin,
  twitter,
  facebook,
}) {
  return (
    <div className={classes.ProfileHeader}>
      <div className={classes.coverSection}>
        <div
          className={classes.cover}
          style={{ backgroundImage: `url(${cover})` }}
        ></div>
      </div>
      <div className={classes.ProfileSection}>
        <div>
          <div
            className={classes.profile}
            style={{ backgroundImage: `url(${profile})` }}
          ></div>
        </div>
        <div className={classes.profileHead}>
          <h1>{name}</h1>
          <h4>{type}</h4>
          <p>
            {city}, {state}, {country}, {zipcode}
          </p>
        </div>
        <div className={classes.social}>
          <div>
            {linkedin != null && (
              <Link href={linkedin}>
                <a>
                  <img src="/LinkedIN.svg" />
                </a>
              </Link>
            )}
            {twitter != null && (
              <Link href={twitter}>
                <a>
                  <img src="/Twitter.svg" />
                </a>
              </Link>
            )}
            {facebook != null && (
              <Link href={facebook}>
                <a>
                  <img src="/Facebook.svg" />
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
