import React from "react";
import classes from "./EventCard.module.css";

const EventCard = ({ image, title, description, date }) => {
  return (
    <div className={classes.EventCard}>
      <div className={classes.imgContainer}>
        <img src={image} />
      </div>
      <div className={classes.textContainer}>
        <h1>{title}</h1>
        <p>{description} ...</p>
        {/* <p>{date}</p> */}
      </div>
      <div className={classes.btngroup}>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default EventCard;
