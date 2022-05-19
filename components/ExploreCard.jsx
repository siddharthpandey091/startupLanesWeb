import React from "react";
import styles from "./ExploreCard.module.css";

function ExploreCard({ img, title }) {
  return (
    <div className={styles.ExploreCards}>
      <div className={styles.ExploreCard}>
        <div>
          <img src={img} />
        </div>
        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
          <h1>{title}</h1>
          <p>explore best {title}.</p>
        </div>
      </div>
    </div>
  );
}

export default ExploreCard;
