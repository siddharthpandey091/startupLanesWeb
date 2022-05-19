import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import classes from "./ProfileExpr.module.css";

const ProfileOtherLinksForm = ({
  fb,
  twitter,
  linkedin,
  website,
  updateSocial,
}) => {
  const [userFb, setuserFb] = useState("");
  const [userLinkedIn, setuserLinkedIn] = useState("");
  const [userTwitter, setuserTwitter] = useState("");
  const [userWeb, setuserWeb] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleCancel = () => {
    setShowBtn(false);
    setEditMode(false);
  };

  const handleEditMode = () => {
    setShowBtn(true);
    setEditMode(true);
  };

  const handelSubmit = () => {
    updateSocial(userFb, userLinkedIn, userTwitter, userWeb);
    setEditMode(false);
    setShowBtn(false);
  };

  return (
    <div className={classes.ProfileExpr}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
        <h1>Social Links</h1>
        <div style={{ cursor: "pointer" }} onClick={handleEditMode}>
          <FaEdit />
        </div>
      </div>
      <div className={classes.inputs}>
        {(fb == null &&
          twitter == null &&
          linkedin == null &&
          website == null) ||
        editMode ? (
          <>
            <img src="/Facebook.svg" />
            <input
              type="text"
              placeholder="Facebook profile url"
              defaultValue={fb}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setuserFb(e.target.value)}
            />
            <br />
            <br />
            <img src="/LinkedIN.svg" />
            <input
              type="text"
              placeholder="LinkedIn profile url"
              defaultValue={linkedin}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setuserLinkedIn(e.target.value)}
            />
            <br />
            <br />
            <img src="/Twitter.svg" />
            <input
              type="text"
              placeholder="Twitter profile url"
              defaultValue={twitter}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setuserTwitter(e.target.value)}
            />
            <br />
            <br />
            <img src="/web.svg" />
            <input
              type="text"
              placeholder="Website url"
              defaultValue={website}
              onFocus={() => setShowBtn(true)}
              onChange={(e) => setuserWeb(e.target.value)}
            />
          </>
        ) : (
          <>
            <img src="/Facebook.svg" />
            <div style={{ display: "inline" }}>
              {fb ? <a href={fb}>{fb}</a> : "not provided"}
            </div>
            <br />
            <br />
            <img src="/LinkedIN.svg" />
            <div style={{ display: "inline" }}>
              {linkedin ? <a href={linkedin}>{linkedin}</a> : "not provided"}
            </div>
            <br />
            <br />
            <img src="/Twitter.svg" />
            <div style={{ display: "inline" }}>
              {twitter ? <a href={twitter}>{twitter}</a> : "not provided"}
            </div>
            <br />
            <br />
            <img src="/web.svg" />
            <div style={{ display: "inline" }}>
              {website ? <a href={website}>{website}</a> : "not provided"}
            </div>
          </>
        )}
      </div>
      {showBtn && (
        <div className="btngroup_profile">
          <button onClick={handelSubmit} className="btn btn-primary">
            save
          </button>
          <button onClick={handleCancel} className="btn btn-outline-primary">
            cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileOtherLinksForm;
