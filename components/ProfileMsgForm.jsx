import React, { useState, useEffect } from "react";
import classes from "./ProfileMssg.module.css";
import { FaEdit } from "react-icons/fa";

function ProfileMssgForm({ msg, clickHandler }) {
  const [bio, setbio] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // const inputRef = useRef();

  const handleCancel = () => {
    setbio("");
    setShowBtn(false);
    setEditMode(false);
  };

  const seteditmode = () => {
    setEditMode(true);
  };

  const handelSubmit = (bio) => {
    clickHandler(bio);
    setEditMode(false);
  };

  return (
    <div className={classes.ProfileMssg}>
      {msg == null || editMode ? (
        <>
          <textarea
            max="400"
            type="text"
            placeholder="Write little bit about yourself"
            defaultValue={msg}
            onChange={(e) => setbio(e.target.value)}
            onFocus={() => setShowBtn(true)}
            // ref={function (input) {
            //   if (input != null) {
            //     input.focus();
            //   }
            // }}
            autoFocus
          ></textarea>
          <br />
          {showBtn && (
            <div className="btngroup_profile">
              <button
                onClick={() => handelSubmit(bio)}
                className="btn btn-primary"
              >
                save
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-outline-primary"
              >
                cancel
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <p>{msg}</p>
          <div style={{ cursor: "pointer" }} onClick={seteditmode}>
            <FaEdit />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMssgForm;
