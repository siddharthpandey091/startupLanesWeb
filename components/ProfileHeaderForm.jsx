import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../api";
import classes from "./ProfileHeader.module.css";

function ProfileHeaderForm({
  profile,
  cover,
  name,
  type,
  uploadProfile,
  uploadCover,
}) {
  const [industries, setIndustries] = useState([]);
  const [industryState, setIndustryState] = useState([]);

  // get all industries
  useEffect(() => {
    axios
      .get(`${url}/get-industrytypes.php`)
      .then((res) => {
        setIndustries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.ProfileHeader}>
      <div className={classes.coverSection}>
        {cover !== null ? (
          <div
            className={classes.cover}
            style={{ backgroundImage: `url(${cover})` }}
          >
            <div className={classes.updateProfileCover}>
              <label htmlFor="cover">
                Cover picture <img src="/upload.svg" />
              </label>
              <input
                type="file"
                placeholder="choose your cover"
                id="cover"
                style={{ display: "none" }}
                accept="image/*"
                onChange={() => uploadCover(event)}
              />
            </div>
          </div>
        ) : (
          <>
            <label
              className={classes.cover}
              htmlFor="cover"
              style={{ paddingTop: "100px" }}
            >
              Cover picture <img src="/upload.svg" />
            </label>
            <input
              type="file"
              placeholder="choose your cover"
              id="cover"
              style={{ display: "none" }}
              accept="image/*"
              onChange={() => uploadCover(event)}
            />
          </>
        )}
      </div>
      <div className={classes.ProfileSection}>
        <div>
          {profile !== null ? (
            <section
              className={classes.profile}
              style={{
                backgroundImage: `url(${profile})`,
              }}
            >
              <div
                className={classes.updateProfileCover}
                style={{ borderRadius: "50%" }}
              >
                <label htmlFor="profile">
                  Profile picture <img src="/upload.svg" />
                </label>
                <input
                  type="file"
                  placeholder="choose your cover"
                  id="profile"
                  style={{ display: "none" }}
                  onChange={() => uploadProfile(event)}
                  accept="image/*"
                />
              </div>
            </section>
          ) : (
            <>
              <label
                className={classes.profile}
                htmlFor="profile"
                style={{ paddingTop: "90px" }}
              >
                Profile picture <img src="/upload.svg" />
              </label>
              <input
                type="file"
                placeholder="choose your cover"
                id="profile"
                style={{ display: "none" }}
                onChange={() => uploadProfile(event)}
                accept="image/*"
              />
            </>
          )}
        </div>
        <div className={classes.profileHead}>
          <h1> {name} </h1>
          <select
            style={{ width: "200px", color: "#1e1e1e" }}
            className="form-select"
            value={type}
            onChange={(e) => setIndustryState(e.target.value)}
          >
            {industries.map((val) => {
              return (
                <option key={val.id} value={val.id}>
                  {val.industry}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderForm;
